import { StateService } from './../../core/services/state.service';
import { countryVatObjMap } from './../../core/services/data/countryVatObjMap';
import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})

export class CountrySelectComponent implements OnInit, AfterViewInit {
  @Input() countries: string[];
  @Input() usersCountry: string;
  @Input() usersCountryName: string;

  countryVatObjMap = countryVatObjMap;

  @Output() getVat = new EventEmitter();
  constructor(private stateS: StateService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    const component = this;

    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    var x, i, j, l, ll, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      // console.log(selElmnt.options[selElmnt.selectedIndex].value);
      a.dataset.value = selElmnt.options[selElmnt.selectedIndex].value;
      // console.log(a);
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        // console.log(c);
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.dataset.value = selElmnt.options[j].value;
        c.dataset.vatN = selElmnt.options[j].getElementsByTagName('span')[0] && selElmnt.options[j].getElementsByTagName('span')[0].innerHTML;
        c.addEventListener("click", function (e) {
          console.log(this.dataset);

          let vatN =  this.dataset.vatN.split(' ')[0];
          console.log(vatN);


          console.log(vatN > 0);
          console.log(+vatN > 0 ? vatN : 0);

          component.stateS.swapUserCountryAndVatRate(this.dataset.value);
          component.stateS.changeVatRate(+vatN > 0 ? vatN : 0);

          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              // console.log(this.dataset.value);
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }

    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
      except the current select box: */
      var x, y, i, xl, yl, arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i)
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
  }

}
