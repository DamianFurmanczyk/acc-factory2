export interface account {
    created_at: null | string,
    description: string,
    id: number,
    name: string,
    price_usd: string,
    small?: number,
    large?: number,
    medium?: number,
    region_id: number,
    slug: string,
    updated_at: null | string,
    count?: number,
    selQuantity?: number
    codes_count: number
    from?: string,
    price?: number
}

export interface accountsDataResponse {
    acc: account[],
    count: number[]
}