export interface ItemData{
  id?:number|string
  name?:string;
  des?:string;
  image?:string;
  price?:number;
}
export interface CartItems{
  id?: string
  status?: number,
  orderId?:string
  itemInfo?: [{
        itemId: number|string
        buyNum: number
        itemPrice:number
  
      }]
}

