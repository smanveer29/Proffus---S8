import { CLIENT_INFO } from "../env";
import axios from "./axios";
import headerConfig from "./headerConfig";

const postRequest = (endpoint, requestBody, onSuccess, access_token, setLoading, setError, onError) => {
    setLoading && setLoading(true);
    setError && setError(null);
    // const requestBodyWithClientDetails = { ...requestBody, client: CLIENT_INFO }
    // requestBody = JSON.stringify(requestBodyWithClientDetails)
    // console.log(requestBody)
    axios.post(endpoint, requestBody, headerConfig(access_token))
        .then(res => {
            const success = res.data.success
            if (success) onSuccess(res)
            else {
                setError && setError(res.data.message)
                onError && onError(res)
            }
            // console.log(res)
            // console.log(res.data)
        })
        .catch(err => console.log(err))
        .then(() => setLoading && setLoading(false))
}

export default postRequest;