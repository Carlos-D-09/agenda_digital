export class Usuario{
    constructor(
        public nombres:string,
        public apellidos:string,
        public correo_electronico:string,
        public celular:number,
        public user_key:string,
        public id?:number
    ){}
}