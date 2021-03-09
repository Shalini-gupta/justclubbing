import { Api } from "./api";

export class TimeZoneFunction {
    timezone: string
    constructor(private api: Api){}  
    getTimeZone(lat, long) {
        return new Promise(resolve=>{
            var apiKey = 'AIzaSyCPGDbuZIxAykFZ7Mtva26GpmVzhZTJ3Ww'
            let url = 'https://maps.googleapis.com/maps/api/timezone/json?location='+lat+','+long+'&timestamp=1331161200&key='+apiKey
            this.api.getConfig(url).subscribe((data:any) => {
                resolve(data.timeZoneId);
            })
        })
    }
      
}