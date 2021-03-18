export const fetchWithErrorHandling = async (url, body, timeout = 10000) => {
    const timeoutId = setTimeout(() => {
        throw new Error("Timeout");
    }, timeout);
    
    try {
        let params = null;

        if (body) {
            params = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            };
        }

        const res = await fetch(url = '/form', params);
        clearTimeout(timeoutId);
  
        if (res.status !== 200) {
            return ["Form not sent", null];
        }
  
        const json = await res.json();
  
        if (!json.success) {
            return [json.errorMessage, null];
        }
        return [null, true];
      } catch (err) {
        clearTimeout(timeoutId);
        console.log(err);
        return ["Form not sent, please check it", err.message];
      }
}

export const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const dateRegExp = /^[0-1][0-9]\/[0-3][0-9]\/[2][0-9]{3}$/;