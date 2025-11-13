export default function useAuthFetch(){

    let isRefreshing= false;
    let refreshPromise:Promise<number>|null=null;

    const authFetch = async (url:string, options?:RequestInit):Promise<Response> =>{
        let response = await fetch(url, {...options, credentials: "include"});
        
        if(response.status == 403){
            if(!isRefreshing){
                isRefreshing = true;
                refreshPromise = refresh()
            }

            const refreshStatus = await refreshPromise;

            isRefreshing=false;
            refreshPromise=null;

            if(refreshStatus==200){
                response = await fetch(url, {...options, credentials: "include"});
            }
        }
        return response;
    }

    const refresh = async ():Promise<number>=>{
        return 10;
    }
    return {authFetch};
}