class appConfig 
{
    constructor()
    {
        this.web_api_url = 'https://medimedservice.azurewebsites.net';
        //No Dash in the end of the url
        this.restful_patient_api = '/api'; 
    };
    getURL()
    {
        return this.web_api_url + this.restful_patient_api;
    };
};

export default appConfig;