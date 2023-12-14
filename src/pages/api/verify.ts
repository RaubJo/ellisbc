export async function post({ request }) {
    const data = await request.json();
  
    const url = import.meta.env.GOOGLE_RECAPTCHA_URL

    const requestBody = {
      secret: import.meta.env.GOOGLE_RECAPTCHA_SECRET,
      response: data.token
    };
  
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(Object.entries(requestBody)).toString()
    });
  
    const responseData = await response.json();
  
    return new Response(JSON.stringify(responseData), { status: 200 });
  }


  