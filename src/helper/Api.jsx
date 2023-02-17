export default class Api {
    constructor() {
        this.api_token = null;
        this.client = null;
        this.api_url = process.env.API_MAIN_URL;
    }
    init = () => {
        this.api_token = getCookie("ACCESS_TOKEN");
        let headers = {
            Accept: "application/json",
        };
        if (this.api_token) {
            headers.Authorization = `Bearer ${this.api_token}`;
        }
        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        });
        return this.client;
    };
    // getCategories = (params) => {
    //   return this.init().get("business/get-categories/", {params: params});
    // };
    // getRestaurants = (data) => {
    //   return this.init().post("business/get-business-list/?province=6&user_id=d90f0b537aff11edb36a548aaed1f418", data);
    // };

    getCategories = async () => {
        const URL = this.api_url + "business/get-categories/";

        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const responseJson = await response.json();

            let categoriesList = [];

            for (let i = 0; i < responseJson.data.length; i++) {
                categoriesList.push({
                    name: responseJson.data[i].business_category_name,
                    id: responseJson.data[i].business_category_id,
                });
            }
            setCategories(categoriesList);
        } catch (error) {
            console.log(error);
        }
    };
}
