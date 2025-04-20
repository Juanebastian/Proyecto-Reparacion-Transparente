import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// En tu componente .ts o en app.module.ts
import {
  Chart,
  BarController,
  DoughnutController,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  BarController,
  DoughnutController,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
