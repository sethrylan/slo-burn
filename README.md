# SLO Burn Calculator

This project is a application to visualize [SLO burn rate monitoring](https://sre.google/workbook/alerting-on-slos/).

> The error budget provides a clear, objective metric that determines how unreliable the service is allowed to be within a single quarter. This metric removes the politics from negotiations between the SREs and the product developers when deciding how much risk to allow.
>
> An error budget aligns incentives and emphasizes joint ownership between SRE and product development. Error budgets make it easier to decide the rate of releases and to effectively defuse discussions about outages with stakeholders, and allows multiple teams to reach the same conclusion about production risk without rancor.
> 
> Burn rate is how fast, relative to the SLO, the service consumes the error budget.

<div align="center">
<img src="https://github.com/user-attachments/assets/d1f5f393-2810-4e2a-8b7d-0f0b1abdb0fd" alt="math+tables+charts" width="50%"/>
</div>

## Developing

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
