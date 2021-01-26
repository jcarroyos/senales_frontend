<template>
  <div class="Galerias" id="pagegaleria">  
     <full-page v-bind:options="options">
      
      <div  class="section fondodetalle">
      
        <video-background  v-bind:src="((this.images.length>0)&&(this.images.Videosenal == undefined)&&(this.images[0].Videosenal!=null))?(urlservior+this.images[0].Videosenal.url):''"  style="max-height: 1000px; height: 100vh;">
          
       </video-background>
       <div id="nav">
        <router-link to="/">Home</router-link>|        
        <router-link to="/galeria">galeria</router-link>|
        <router-link to="/mapa">Mapa</router-link>
        </div>
        <router-view />
      
      </div>
      <div class="section">
        <div id="contenidoIniciodetalle" class="container contenttitulo">
          <div class="row">
            <div class="col-md-12">
              
            </div>
          </div>
          <div class="row">            
            <div class="centertitle col-md-12">
              <a  v-bind:href="'/galeria'" title="Volver" class="btn btn-defalult"  >
                <img alt="Vue logo" src="../assets/leftarrow.svg">
              </a>
              <h1 class="titulo">{{this.images.length>0?this.images[0].titulo:''}}</h1>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-5 contentparrafo">
              <p class="parrafo">{{this.images.length>0?this.images[0].descripccion:''}}</p>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-2"></div>
            <div class="col-xs-12 col-sm-6 col-md-5 contentparrafo">              
               <p class="parrafo"><strong><label class="detallecategoria">Lugar:</label> </strong>{{((this.images.length>0)&&(this.images.lugar == undefined)&&(this.images[0].lugar!=null))?(this.images[0].lugar.Nombre):''}}</p>
                <p class="parrafo"><strong><label class="detallecategoria">Categoria:</label> </strong>{{this.images.length>0?this.images[0].lista_category.nombre:''}}</p>
                <div>
                     <div>
                        <b-button v-b-modal.modal-1>Colaboarar</b-button>
                                                                                                      
                        <b-modal id="modal-1" ref="my-modal" v-bind:title="this.images.length>0?this.images[0].titulo:''">
                            <ValidationObserver ref="observer">
                                  <b-form slot-scope="{ validate }" @submit.prevent="validate().then(handleSubmit)">
                                    <ValidationProvider rules="required" name="Nombre">
                                      <b-form-group slot-scope="{ valid, errors }" label="">
                                          <b-form-input
                                            type="text"
                                            v-model="reflejo.Nombre"
                                            :state="errors[0] ? false : (valid ? true : null)"
                                            placeholder="Nombre del Refeljo">
                                          </b-form-input>
                                          <b-form-invalid-feedback>
                                          El campo Nombre Refeljo es obligatorio 
                                          </b-form-invalid-feedback>
                                      </b-form-group>
                                    </ValidationProvider>

                                  <b-form-group id="descripcion" label="" label-for="input-2">
                                      <b-form-textarea  id="descripcion"   placeholder="Descripcción del Refeljo" rows="3" max-rows="6" v-model="reflejo.Descripcion"></b-form-textarea>                                
                                  </b-form-group> 

                                  <ValidationProvider rules="required" name="lugar">
                                  <b-form-group slot-scope="{ valid, errors }" label="">
                                      <b-form-input
                                        type="text"
                                        v-model="lugar.Nombre"
                                        :state="errors[0] ? false : (valid ? true : null)"
                                        placeholder="Lugar del Refeljo">
                                      </b-form-input>
                                      <b-form-invalid-feedback>
                                      El campo Lugar del Refeljo es obligatorio 
                                      </b-form-invalid-feedback>
                                  </b-form-group>
                                </ValidationProvider>


                                <b-form-group id="Departamento" label="" label-for="Departamento">                                 
                                    <b-form-input  id="Departamento" type="text"  placeholder="Departamento" v-model="lugar.Departamento"></b-form-input>                      
                                </b-form-group>

                                <b-form-group id="Municipio" label="" label-for="Municipio">                                 
                                    <b-form-input  id="Municipio" type="text"  placeholder="Municipio" v-model="lugar.Municipio"></b-form-input>                      
                                </b-form-group>
                              

                              <ValidationProvider rules="required" name="Imagen Refeljo">
                            <b-form-group slot-scope="{ valid, errors }" label="">
                                <b-form-file
                                  type="file"
                                  v-model="reflejo.Multimedia"
                                  ref="Imagen"
                                  :state="errors[0] ? false : (valid ? true : null)"
                                  @change="onInput1"
                                  placeholder="Imagen del Refeljo">
                                </b-form-file>
                                <b-form-invalid-feedback>
                                 El campo Imagen del Refeljo es obligatorio 
                                </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>

                         <ValidationProvider  name="Video Refeljo">
                            <b-form-group  label="">
                                <b-form-file
                                  type="file"
                                  v-model="reflejo.VideoReflejo"
                                  ref="Video"
                                  @change="onInput2"
                                  placeholder="Video del Refeljo">
                                </b-form-file>
                                <b-form-invalid-feedback>
                                 El campo Imagen del Refeljo es obligatorio 
                                </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                                
                              
                                <b-button block type="submit" variant="primary">Submit</b-button>
                              </b-form>
                          </ValidationObserver>   
                          <FlashMessage></FlashMessage>     
                        </b-modal>
                      </div>
                        
                  </div>
            
            
            </div>
          </div>   
                        
          <div class="row">
            <div class="container-fluid">
            <div class="row">
                <div class="infobusqueda col-xs-12 col-sm-7 col-md-7">
                <span class="info">Lista de reflejos</span>
                </div>
            </div>   
              <div class="grid" id="detallereflejos">
               
                <masonry :cols="{default: 5, 1000: 4, 700: 2, 400: 1}"   :gutter="{default: '10px', 700: '10px'}" data-masonry-options='{ "columnWidth": 200}'> >
                  <div v-for="(item, index) in this.images.length>0?this.images[0].reflejos:'' " :key="index">
                    <div v-if="item.publicar == true"> 
                  <div class="grid-item">
                    <div class="contenedor-img galery">
                      <div class="mascara">                                          
                        <img v-bind:src=" (item.Multimedia)?(urlservior+item.Multimedia.url):'/'" class="img-fluid" />
                        <div class="imfoImagen">
                           <!-- <p>{{item.length>0?item.Nombre:''}}</p>-->
                         
                           <p>{{item.Nombre?item.Nombre:''}}</p>

                           <div v-if="item.videoReflejo != null">  
                                <a class="link" v-bind:href="'/detalle-reflejo?id='+item.id">Ver Imagen</a>   
                                <a class="link" v-bind:href="'/detalle-reflejo-video?id='+item.id"><img alt="Vue logo" src="../assets/play.svg"></a> 

                              </div>
                              <div v-else>
                               
                                 <a class="link" v-bind:href="'/detalle-reflejo?id='+item.id">Ver Imagen</a>   
                              </div>              
                          </div>
                      </div>
                    </div>
                  </div>
                    </div>
                 </div>
                </masonry>
              </div>
            </div>
          </div>
        </div>
      </div>
    </full-page>
    
   
 
  </div>
</template>
<script>
import axios from "axios";
 import { ValidationObserver, ValidationProvider } from 'vee-validate';
 export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
export default {
  name: "galaria",
   components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    
    return {
      urlservior:RUTA_SERVIDOR,
      loading: false,
      categoria: "",      
      images: [],      
      listcategorias: [],      
      selected: "", 
      options: {
        //licenseKey: 'YOUR_KEY_HERE',
        afterLoad: this.afterLoad,

        navigation: false
      },
      reflejo:{
        Nombre:'',
        Descripcion:'',        
        Multimedia:null,
        VideoReflejo:null
      },

      lugar:{
        Nombre:'',
        Departamento:'',
        Municipio:'',
      },

      files:'',
    };
  },

  mounted() {
    this.getImges();    
  },

  methods: {
    
      handleSubmit () {     
      if(this.reflejo.Nombre != ""   && this.reflejo.Multimedia != null && this.lugar.Nombre != "" ){
        console.log('campos habilitados')
        this.addToReflejo();
       }else{
         console.log('campos vacios')
       }
      
      console.log(this.reflejo);
       console.log(this.lugar);
    },
     onInput1 (event) {     
      const MAXIMO_TAMANIO_BYTES = 3000000;
      if(event.target.files[0].type == "video/mp4"){        
        this.$refs.Imagen.reset();
        this.flashMessage.error({title: '', message: 'Solo debe cargar imagenes'});
       }
       else {
           if(event.target.files[0].size > MAXIMO_TAMANIO_BYTES) { 
              this.$refs.Imagen.reset();
                this.flashMessage.error({title: '', message: 'El tamaño de la imagen es muy grande debe ser menor a 5MB'});
            }else{
              this.files1 = event.target.files[0];
            }
       }    
        
    },
    onInput2 (event) {
      const MAXIMO_TAMANIO_BYTES = 3000000;
       if((event.target.files[0].type == "image/jpeg")||(event.target.files[0].type == "image/png")) {
          
          this.$refs.Video.reset();   
           this.flashMessage.error({title: '', message: 'Solo debe cargar videos'});               
      }else {
        if(event.target.files[0].size > MAXIMO_TAMANIO_BYTES) { 
               this.$refs.Video.reset();   
                this.flashMessage.error({title: '', message: 'El tamaño del video es muy grande debe ser menor a 5MB'});
            }else{
              this.files2 = event.target.files[0];
            }
       // this.files2 = event.target.files[0];  
      }
         
    },
    
     addToReflejo(){  

      let dataLugar = this;
      let newlugar ={       
        Nombre:this.lugar.Nombre, 
        Departamento:this.lugar.Departamento,
        Municipio:this.lugar.Municipio           
      }

      //insert lugar      
       axios.post(RUTA_SERVIDOR+'/lugars',newlugar)
      .then(response => {
       dataLugar= response.data;
        console.log(response)        
        let objpost = this.images[0];
        delete objpost.reflejos;
              //insert reflejo
              let newreflajo ={
                Nombre:this.reflejo.Nombre,
                Descripcion:this.reflejo.Descripcion, 
                lugars:[dataLugar],
                senale:objpost,
                Multimedia:null,
                VideoReflejo:null           
              }
              
              axios.post(RUTA_SERVIDOR+'/reflejos',newreflajo)
              .then(response => {
                console.log('Response')
                console.log(response)
                let idnewReflejo = response.data.id


                const axios = require('axios')
                const STRAPI_BASE_URL = RUTA_SERVIDOR
                const formData = new FormData()
                formData.append('files', this.files1)                
                formData.append('ref', 'Reflejo') 
                formData.append('refId', idnewReflejo) 
                formData.append('field', 'Multimedia')

                const formData_ = new FormData()
                formData_.append('files', this.files2)                
                formData_.append('ref', 'Reflejo') 
                formData_.append('refId', idnewReflejo) 
                formData_.append('field', 'videoReflejo')

                axios.post(`${STRAPI_BASE_URL}/upload`, formData_,
                {
                    
                      headers: {'Content-Type': 'multipart/form-data' },
                      onUploadProgress: uploadEvent => {
                      console.log('Upload Progress:' + Math.round(uploadEvent.loaded / uploadEvent.total* 100) + '%')
                    }
                    
                  })


                   axios.post(`${STRAPI_BASE_URL}/upload`, formData,
                {
                    
                      headers: {'Content-Type': 'multipart/form-data' },
                      onUploadProgress: uploadEvent => {
                      console.log('Upload Progress:' + Math.round(uploadEvent.loaded / uploadEvent.total* 100) + '%')
                    }
                    
                  })

                 this.$refs['my-modal'].hide();
                   
              })
              
              .catch((error) =>{
                  console.log(error);
            })
        this.flashMessage.info({title: '', message: 'Se ha guardado un nuevo reflejo'});

      })
      .catch((error) =>{
          console.log(error);
      })
    },

    getImges() {        
        console.log(this.$route.query.id) 
        var idparametro = this.$route.query.id;
        //var senales = "https://senales.herokuapp.com/senales?id="+idparametro;
        var senales =RUTA_SERVIDOR+"/senales?id="+idparametro;
        axios.get(senales).then(response => {
        this.images = response.data;            
        console.log("señales detalle");          
        console.log(this.images);
        //console.log(this.images[0].lugar);
      });
    },

  

    search: function() {
      this.loading = true;
      var senales = RUTA_SERVIDOR+"/senales";
      axios.get(senales).then(response => {
        this.images = response.data;
        this.loading = false;
      });
    }
  },
  computed: {

      
    searchcategoria: function() {
      //var searchString;
      var photos = this.images;
      var categoria = this.categoria;

      if (!categoria) {
        return photos;
      }

      categoria = categoria.trim().toLowerCase();

      photos = photos.filter(function(item) {
        debugger;
        if (
          item.lista_category.nombre.toLowerCase().indexOf(categoria) !== -1 ||
          item.descripccion.toLowerCase().indexOf(categoria) !== -1 ||
          item.titulo.toLowerCase().indexOf(categoria) !== -1
        ) { 
          return item;
        }
      });

      return photos;
    }
  }
};
</script>

<style lang="less">
@import "~@/scss/galeria.less";

@media  (max-width: 991px){

  #nav {
    position: relative!important;
    transform: rotate(0deg)!important;
    top: 20px !important;
    z-index: 10 !important;
    margin-bottom: 27px!important;
    text-align: center;
}
  
  
div#contenidoIniciodetalle .contentparrafo {
    flex: 0 0 100%;
    max-width: 100%;
}
div#pagegaleria a.btn.btn-defalult {    
    left: 16px !important;
    top: -64px !important;
}
}
</style>

