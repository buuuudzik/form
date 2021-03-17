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