import { Component, OnInit, inject } from "@angular/core";
import { take } from "rxjs";
import { SharedModule } from "../../shared/shared.module";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$
      .pipe(take(1))
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(["/dashboard"]);
        }
      });
  }

  login() {
    this.oidcSecurityService.authorize();
  }
}
