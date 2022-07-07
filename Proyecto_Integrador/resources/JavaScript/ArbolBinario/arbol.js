class NodoArbol{
    constructor(llave, dato){
        this.llave=llave;
        this.dato=dato;
        this.der=null;
        this.izq=null;
    }
}

class Arbol{
    constructor(){
        this.raiz=null;
    }

    tieneRaiz(){
        return this.raiz===null;
    }

    add(llave, valor){
        if(this.tieneRaiz()){
            this.raiz=new NodoArbol(llave, valor);
        }else{
            let ladoIzquierdo;
            let actual=this.raiz;
            while(true){
                if(actual.llave>llave){
                    ladoIzquierdo=true;
                }else{
                    ladoIzquierdo=false;
                }
                if(ladoIzquierdo){
                    if(actual.izq===null){
                        actual.izq=new NodoArbol(llave, valor);
                        break;
                    }else{
                        actual=actual.izq;
                    }
                }else{
                    if(actual.der===null){
                        actual.der=new NodoArbol(llave, valor);
                        break;
                    }else{
                        actual=actual.der;
                    }
                }
            }
        }
    }
    buscar_dato(llave){
        if(llave===null){
            console.log("entre a nulo, no valgo nada");
            return null;
        }
        let actual=this.raiz;
        while(actual.llave!=llave){
            if(actual.llave<llave){
                actual=actual.der;
            }else{
                actual=actual.izq;
            }
            if(actual===null){
                console.log("No estoy");
                return null;
            }
        }
        return actual;
    }

    econtrar_minimo(){
        let minimo=this.buscar_minimo(this.raiz);
        return minimo;
    }
    buscar_minimo(llave){
        let anterior=llave;
        if(!this.tieneRaiz()){
            while(llave!=null){
                anterior=llave;
                llave=llave.izq;
            }
        return anterior;
        }
        return null;
    }
    ordenar_PreOrden(llave, array){
        if(llave===null){
            return;
        }
        console.log(llave.dato);
        array.push(llave.dato);
        this.ordenar_PreOrden(llave.izq);
        this.ordenar_PreOrden(llave.der);
        return array;
    }

    mostrar_PreOrden(){
        let array=[];
        array=this.ordenar_PreOrden(this.raiz, array);
        return array;
    }
    ordenar_InOrden(llave, array){
        
        if(llave===null){
            return;
        }
        this.ordenar_InOrden(llave.izq);
        console.log(llave.dato);
        array.push(llave.dato);
        this.ordenar_InOrden(llave.der);
        return array;
    }
    
    mostrar_InOrden(){
        let array=[];
        array= this.ordenar_InOrden(this.raiz, array);
        return array;
    }
    ordenar_PostOrden(llave, array){
        if(llave===null){
            return;
        }
        this.ordenar_PostOrden(llave.izq);
        this.ordenar_PostOrden(llave.der);
        console.log(llave.dato);
        array.push(llave.dato);
        return array;
    }
    
    mostrar_PostOrden(){
        let array=[];
        array= this.ordenar_PostOrden(this.raiz, array);
        return array;
    }

    eliminar(llave){
        let actual=this.raiz;
        let anterior=this.raiz;
        let ladoIzquierdo=true;
        if(llave===null){
            return null;
        }
        while(actual.llave!==llave){
            anterior=actual;
            if(actual.llave<llave){
                actual=actual.der;
                ladoIzquierdo=false;
            }else{
                actual=actual.izq;
                ladoIzquierdo=true;
            }
            if(actual===null){
                return false;
            }
        }
        console.log(actual);

        if(actual.izq===null && actual.der===null){
            console.log("caso 1");
            if(actual===this.raiz){
                this.raiz=null;
            }
            if(!ladoIzquierdo){
                anterior.der=null;
            }else{
                anterior.izq=null;
            }
        }

        else if(actual.izq===null && actual.der!==null){         
            console.log("caso 2 der");  
            if(actual===this.raiz){
                this.raiz=actual.der;
            }
            if(actual.llave<this.raiz.llave){
                anterior.izq=actual.der;
            }else{
                anterior.der=actual.izq;
            }
        }
        
        else if(actual.izq!==null && actual.der===null){
            console.log("caso 2 der");
            if(actual===this.raiz){
                this.raiz=actual.izq;
            }
            if(actual.llave<this.raiz.llave){
                anterior.izq=actual.izq;
            }else{
                anterior.der=actual.izq;
            }
            
        }

        else{
            console.log("caso 3");
            let nodoR=this.getNodoRemplazado(actual);
            if(actual===this.raiz){
                this.raiz=nodoR;
            }
            else if(ladoIzquierdo){
                anterior.izq=nodoR;
            }else{
                anterior.der=nodoR;
            }
            nodoR.izq=actual.izq; 
        }
    }

    getNodoRemplazado(nodoEliminado){
        let nodoRemplazado=nodoEliminado;
        let nodoAnteriorR=nodoEliminado; 
        let actual=nodoEliminado.der; 
        console.log(nodoEliminado);
        console.log(nodoEliminado.der);

        while(actual!==null){
            console.log(actual);
            nodoAnteriorR=nodoRemplazado;
            nodoRemplazado=actual;
            actual=actual.izq;
        }

        if(nodoRemplazado!==nodoEliminado.der){
            nodoAnteriorR.izq=nodoRemplazado.der; 
            nodoRemplazado.der=nodoEliminado.der;
        }
        return nodoRemplazado;
    }
    
    
}


export {NodoArbol, Arbol};