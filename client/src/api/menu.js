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
    console.log(res);

    try {
      let response = await res.json();
      console.log(response)
    } catch (error) {
      console.error(error);
    }
    return res;
  } catch (error) {
    console.log(error.json());
    console.log(error.response)
  }
}

export {
  menuRegister,
}