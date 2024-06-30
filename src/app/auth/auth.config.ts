import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
            config: {
                        authority: 'https://lv-gitlab.intern.th-ab.de/.well-known/openid-configuration',
                        redirectUrl: window.location.origin,
                        postLogoutRedirectUri: window.location.origin,
                        clientId: '2dfdf010b4bceb0ba295abc760fd4c4cf7bf9ebdc4744f672efedf344e5e2af5',
                        scope: 'openid profile',
                        responseType: 'code',
                        silentRenew: true,
                        useRefreshToken: true,
                        renewTimeBeforeTokenExpiresInSeconds: 30,
                        secureRoutes: ['https://backend.tbdpwl.dynv6.net/', 'http://localhost:5090/', 'https://backend-dev.tbdpwl.dynv6.net/'],
                        unauthorizedRoute: '/login'
            }
}
