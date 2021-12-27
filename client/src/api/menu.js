const API_URL = 'http://localhost:3000/api';

const addMenu = async ({ category, name }) => {
  try {
    let res = await fetch(`${API_URL}/category/${category}/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name
      }),
    })

    return res;
  } catch (error) {
    console.log(error)
  }
}

const fetchMenu = async category => {
  console.log(category)
  try {
    let res = await fetch(`${API_URL}/category/${category}/menu`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return res;
  } catch (error) {
    console.log(error)
  }
}

const toggleMenu = async menu => {
  const { id, category } = menu;
  try {
    let res = await fetch(`${API_URL}/category/${category}/menu/${id}/soldout`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return res;
  } catch (error) {
    console.log(error)
  }
}

const updateMenu = async menu => {
  const { id, category, name } = menu;
  try {
    let res = await fetch(`${API_URL}/category/${category}/menu/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name
      })
    })

    return res;
  } catch (error) {
    console.log(error)
  }
}

const removeMenu = async menu => {
  const { id, category } = menu;
  try {
    let res = await fetch(`${API_URL}/category/${category}/menu/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return res;
  } catch (error) {
    console.log(error)
  }
}

export {
  addMenu,
  fetchMenu,
  toggleMenu,
  updateMenu,
  removeMenu,
}