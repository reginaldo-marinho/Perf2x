import { Component } from "@angular/core";


@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar-component.html',
    styleUrls:['./nav-bar-component.css']
})
export class NavBarComponent{ 

    OpenMenuMobile(){
        var menu = document.getElementById("menu");
        menu?.classList.remove("menu-desktop");
        menu?.classList.add("menu-mobile");
        document.getElementById("menu-item")!.style.display= "block"
    }
}