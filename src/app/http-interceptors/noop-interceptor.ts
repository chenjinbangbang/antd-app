import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// console.log('路由拦截器', req, next);

		let token = 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmpiMjF3WVc1NVgybGtJam9pTkdKbU56TTFaVGszTWpZNU5ESXhZVGd3WWpneU16VTVaVGRrWXpJeU9EZ2lMQ0p6WlhOemFXOXVTV1FpT2lKaE9UVmxORGczWWkwNU5qSm1MVFEwTWpBdFlqSTBOeTAwWmpsbVl6YzJZemt4WW1Vak1UWXdOREE1T1RBMk1UYzRNeU14TmpBME1EazVNell4Tnpneklpd2lZWFYwYUV4bGRtVnNJam9pVmtWU1NVWkpSVVFpTENKMWMyVnlTV1FpT2lJNE56UTRNamd6TkdGbU1UazBORGswT0RGaFpqY3lPVFZoTldZMk5tSmlaQ0lzSW5OMVlpSTZJamt4TmpVeE1UWXhOVElpTENKcFlYUWlPakUyTURRd09Ua3dOakVzSW1WNGNDSTZNVFl3TkRFeU1EWTJNWDAuWTRHbDZfd2hQeEtld01xZWM0TGRaeFpSeFJkMDJ0R21FUkNTc1N6UnVkYyIsImNvbXBhbnlfaWQiOiI0YmY3MzVlOTcyNjk0MjFhODBiODIzNTllN2RjMjI4OCJ9.qttMXkb6tsBihpGBiozI1ED5r4FCAF513_QdUExqfnQc5XDAMITbwt9lo5xdrA-V4Enx884Mr6V3lc6ky2hxuQ';

		const authReq = req.clone({
			headers: req.headers.set('Authorization', token)
		});

		return next.handle(authReq);
	}

}