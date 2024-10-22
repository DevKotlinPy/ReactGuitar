import { db } from "../data/db";
import { CartItem, Guitar } from "../types";


export type CartAction =
{type : 'add-to-cart', payload:{item : Guitar}} |
{type : 'remove-to-cart', payload:{item : Guitar['id']}} |
{type : 'decrese-quantity', payload:{item : Guitar['id']}} |
{type : 'increse-quantity', payload:{item : Guitar['id']}} |
{type : 'clear-cart'}


export type CartState = {
    data: Guitar[]
    cart : CartItem[]
}

export const initialState : CartState ={
    data : db, 
    cart : []
}

export const cartReducer =(
    State:CartState = initialState,
    action: CartAction 
) => {
    const MIN_ITEMS = 1
    const MAX_ITEMS = 5

    if(action.type === 'add-to-cart'){
        console.log("desde Add to cart")

        let updatedCart: CartItem[] = []

        const itemExists = State.cart.findIndex(guitar => guitar.id === action.payload.item.id)

        if(itemExists >= 0 ) { // existe en el carrito
            if(State.cart[itemExists].quantity >= MAX_ITEMS) return
            updatedCart = [...State.cart]
            updatedCart[itemExists].quantity++
           
        } else {
            const newItem : CartItem = {...action.payload.item, quantity : 1}
            updatedCart =[...State.cart, newItem]
        }
        return{
            ...State,
            cart: updatedCart
        }
    }

    if(action.type === 'remove-to-cart'){
        return{
            ...State
        }
    }

    if(action.type === 'increse-quantity'){
        return{
            ...State
        }
    }

    if(action.type === 'decrese-quantity'){
        return{
            ...State
        }
    }

    if(action.type === 'clear-cart'){
        return{
            
        }
    }

    return State
}