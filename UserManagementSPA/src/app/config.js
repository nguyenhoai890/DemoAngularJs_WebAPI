class appConfig 
{
    constructor()
    {
        this.web_api_url = 'http://localhost:50420';
        //No Dash in the end of the url
        this.restful_user_api = '/api/user'; 
    };
    getURL()
    {
        return this.web_api_url + this.restful_user_api;
    };
};

export default appConfig;