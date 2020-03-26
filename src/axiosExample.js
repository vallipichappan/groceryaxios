import {Line} from 'vue-chartjs'
import axios from 'axios'

export default{
  
    extends:Line,
    data: () => ({
        results:[],
        chartdata: {
          //labels:['2020-3-05',4,5,6],
          labels:[],
          datasets: [
            {
              label: 'Number of Cases',
               data:[],
             // backgroundColor:['aqua','lightgreen','red','orange'],
              borderWidth:0.5,
              borderColor:"magenta",
              fill: false,
              
            
            },
            {
              label: 'Number of deaths',
               data:[],
              //backgroundColor:['aqua','lightgreen','red','orange'],
              borderWidth:0.5,
              borderColor:"red",
              fill:false
            }
          ]
          
        },
        options: {
           
          
        }
      }),
    methods:{

    
    fetchData : function(){
        axios.get('http://covid19.soficoop.com/country/us').then(response=>{
        this.results=response.data.snapshots
        
        var date = this.results[0].timestamp.slice(0,10)
        this.chartdata.datasets[0].data.push(this.results[0].cases)
            
            this.chartdata.datasets[1].data.push(this.results[0].deaths)
            this.chartdata.labels.push(this.results[0].timestamp+'')
        for(var i = 1; i < this.results.length; i++){
          if(this.results[i].timestamp.slice(0,10)!=date){
            date = this.results[i].timestamp.slice(0,10)
                     
            this.chartdata.datasets[0].data.push(this.results[i].cases)
            
            this.chartdata.datasets[1].data.push(this.results[i].deaths)
            this.chartdata.labels.push(this.results[i].timestamp+'')

          }
        }
       
        this.renderChart(this.chartdata,this.options)
            
    })
    
    }
    
    },
     mounted(){
      
       // console.log('Do I come here')
        this.fetchData()
      
     }
    
    
    
}
