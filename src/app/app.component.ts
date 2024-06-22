import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";
import { SharedModule } from "./shared/shared.module";
import { LoginResponse, OidcSecurityService } from "angular-auth-oidc-client";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, SharedModule, RouterLink],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);

  isAuthenticated: boolean = false;
  displayName: string = "Unknown User";

  title = "security-dashboard";

  // Leaving sidenav out for now, as won't be used for now.
  // @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer, private matIconReg: MatIconRegistry) {
    matIconRegistry.addSvgIcon(
      "gitlab",
      domSanitizer.bypassSecurityTrustResourceUrl("gitlab.svg")
    );
  }

  ngOnInit(): void {
    this.matIconReg.setDefaultFontSetClass('material-symbols-rounded');
    this.oidcSecurityService
      .checkAuth()
      .subscribe((loginResponse: LoginResponse) => {
        this.isAuthenticated = loginResponse.isAuthenticated;

        if (
          loginResponse?.userData?.name !== undefined &&
          typeof loginResponse.userData.name === "string"
        ) {
          this.displayName = loginResponse.userData.name;
        }
      });
  }

  logout() {
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe(() => {
      this.isAuthenticated = false;
      this.oidcSecurityService.logoffLocal();
      this.router.navigate(["/login"]);
    });

  }
}
