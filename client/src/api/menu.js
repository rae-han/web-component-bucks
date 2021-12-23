const API_URL = 'http://localhost:3000/api';

const menuRegister = async name => {
  console.log(name)

  try {
    let res = await fetch(`${API_URL}/category/espresso/menu`, {
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

const menuLoad = async () => {
  try {
    let res = await fetch(`${API_URL}/category/espresso/menu`, {
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

export {
  menuRegister,
  menuLoad,
}