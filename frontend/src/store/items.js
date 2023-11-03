export const LOAD_ITEMS = "items/LOAD_ITEMS";
export const UPDATE_ITEM = "items/UPDATE_ITEM";
export const REMOVE_ITEM = "items/REMOVE_ITEM";
export const ADD_ITEM = "items/ADD_ITEM";

const load = (items, pokemonId) => ({
  type: LOAD_ITEMS,
  items,
  pokemonId
});

const update = (item) => ({
  type: UPDATE_ITEM,
  item
});

const add = (item) => ({
  type: ADD_ITEM,
  item
});

const remove = (itemId, pokemonId) => ({
  type: REMOVE_ITEM,
  itemId,
  pokemonId
});

export const deleteItem = (pokemonId, itemId) => async dispatch => {
  const res = await fetch(`/api/items/${itemId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }); 
  const data = await res.json()
  dispatch(remove(itemId, pokemonId))
}

export const getItems = (pokemonId) => async dispatch => {
  // debugger
  const res = await fetch(`/api/pokemon/${pokemonId}/items`);
  const items = await res.json();
  dispatch(load(items,pokemonId));
}

export const editItems = (item) => async dispatch => {

  const res = await fetch(`/api/items/${item.id}`, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

  });

  const data = await res.json();
  dispatch(update(data));
  return data;
  
}

const initialState = {};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS: 
      const newItems = {};
      action.items.forEach(item => {
        newItems[item.id] = item;
      })
      return {
        ...state,
        ...newItems
      }
    case REMOVE_ITEM: 
      const newState = { ...state };
      delete newState[action.itemId];
      return newState;
    case ADD_ITEM:
    case UPDATE_ITEM: 
      return {
        ...state,
        [action.item.id]: action.item
      };
    default:
      return state;
  }
};

export default itemsReducer;