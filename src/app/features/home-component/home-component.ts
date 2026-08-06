import { Component } from '@angular/core';

import { Hero} from './hero/hero';
import { Features } from './features/features';
import { HowItWorks} from './how-it-works/how-it-works';
import { Stats } from './states/states';
import { Testimonials } from './testimonials/testimonials';
import { Faq } from './faq/faq';
import { Cta} from './cta/cta';
import { DividerComponent } from '../../shared/components/divider-component/divider-component';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [
    Hero,
    Features,
    HowItWorks,
    Stats,
    Testimonials,
    Faq,
    Cta,
    DividerComponent
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {

}