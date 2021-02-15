import { translations } from './../../../core/utils/dataMaps/translations';
import { Component, ChangeDetectionStrategy, ElementRef, ViewChild, HostListener, Input } from '@angular/core';
import { ScrollService } from './../../../core/services/scroll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-ui',
  templateUrl: './footer-ui.component.html',
  styleUrls: ['./footer-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterUiComponent {
  @HostListener('window:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    this.elementsThatNeedToDeactivateOnWindowClick.forEach(
      elArr=> elArr.forEach(
        (el: HTMLElement) => {
          targetElement == el || (targetElement == el.previousElementSibling && el.previousElementSibling.classList.contains('trigger'))? null : el.classList.remove('active')
        }
      )
    )
  }

  @Input() activeTranslation: typeof translations.en;

  @ViewChild('faqColumn', {static: true}) faqCol: ElementRef;
  @ViewChild('linksCol', {static: true}) linksCol: ElementRef;
  dds: NodeListOf<HTMLElement>;
  explendableUlsTriggers: NodeListOf<HTMLElement>;

  elementsThatNeedToDeactivateOnWindowClick;

  constructor(public scrollS: ScrollService, private router: Router) { }

  navigateToDiscordLink() {
    window.open('https://discord.gg/3WdvuhQ');
  }

  navigateToRoute(route: string) {
    this.scrollS.scrollToTopOnNavigate();
    this.router.navigate([route]);
  }

  ngAfterViewInit() {

    this.elementsThatNeedToDeactivateOnWindowClick = this.getElementsThatNeedToDeactivateOnWindowClick();
    this.faqCol.nativeElement.querySelectorAll('dt').forEach((el: HTMLElement) => el.addEventListener('click', toggleSiblingActiveClass))
    this.dds = this.faqCol.nativeElement.querySelectorAll('dd');
    this.explendableUlsTriggers = this.linksCol.nativeElement.querySelectorAll('.trigger');
    this.explendableUlsTriggers.forEach((el: HTMLElement) => el.addEventListener('click', toggleChildrenActiveClass));
    const FooterComponent = this;

    function  toggleSiblingActiveClass() {
      const siblAlreadyActiveFlag = <HTMLElement>this.nextSibling.classList.contains('active');
      FooterComponent.dds.forEach(el => el.classList.remove('active'));

      if(!siblAlreadyActiveFlag) <HTMLElement>this.nextSibling.classList.add('active');
    }

    function toggleChildrenActiveClass() {
      const childAlreadyActiveFlag = <HTMLElement>this.classList.contains('active');

      FooterComponent.explendableUlsTriggers.forEach(el => el.classList.remove('active'));

      if(!childAlreadyActiveFlag) <HTMLElement>this.classList.add('active');
    }
  }

  getElementsThatNeedToDeactivateOnWindowClick() {
      return  [
        document.querySelectorAll('.main-footer_faq dd'),
        document.querySelectorAll('.links-lists-column li')
    ];
  }
}
