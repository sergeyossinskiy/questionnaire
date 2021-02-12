export class Spinner {

    constructor() {
        this.sp = document.querySelector('.p-progress-spinner-container');
    }

    spin() {
        if (this.sp){
            this.sp.style.display = 'block';
        }
        else{
            this.sp = document.querySelector('.p-progress-spinner-container');
            this.spin();
        }
    }

    stop() {
        if (this.sp){
            this.sp.style.display = 'none';
        }
    }
}  

window.spinner = new Spinner();