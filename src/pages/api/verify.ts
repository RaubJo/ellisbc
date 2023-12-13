export async function post({ request }) {
    const data = await request.json();
  
    const recaptchaURL = 'https://www.google.com/recaptcha/api/siteverify';

    const requestBody = {
      secret: '6LehpjApAAAAADu0-jJJnArKoaYRVtK5FOglQDM6',   // This can be an environment variable
      response: data.token       // The token passed in from the client
    };
  
    const response = await fetch(recaptchaURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(Object.entries(requestBody)).toString()
    });
  
    const responseData = await response.json();
  
    return new Response(JSON.stringify(responseData), { status: 200 });
  }


  