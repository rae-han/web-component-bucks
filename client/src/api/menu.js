const API_URL = 'http://localhost:3000/api';

const menuRegister = async name => {
  console.log(name)

  try {
    let result = await fetch(`${API_URL}/category/espresso/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name
      }),
    })

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export {
  menuRegister,
}