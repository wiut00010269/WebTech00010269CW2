import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
    el: '#app',
    data(){
        return {
            from :{
                name:"",
                surname:null,
                img:"",
                course:""
            },
            fromDefault :{
                name:"",
                surname:"",
                img:"",
                course:""
            },
            forDisplay: false,
            contacts:[],
        }
    },
    methods:{
       async createContact(){
           if(this.from.name != "" && this.from.surname !="" && this.from.img !="" && this.from.course != ""){
               const {...contact} = this.from
               const response = request('/api/contacts','POST', contact)
               this.contacts.push({...contact})
               this.from = {...this.fromDefault}
               console.log(contact)
               this.forDisplay = !this.forDisplay
           }else{
               alert("Information can not be empty....")
           }
        },
       async removeContact(id){
           await request(`/api/contacts/${id}`,'DELETE')
           this.contacts = this.contacts.filter(c=>c.id !== id)
        }
    },
    async mounted(){
        this.contacts =  await request('/api/contacts')
    }
})

async function  request(url, method = "GET", data = null){
    try{
        const headers = {}
        let body;
        if(data){
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }
        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    }catch (e){
        console.log('Error : ', e.message)
    }
}