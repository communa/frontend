import Head from 'next/head';

import { DocumentPageWrapper } from 'src/lib/Wrappers';
import { APP_NAME } from 'src/config/consts';
import HeaderDocs from 'src/lib/Layout/HeaderDocs';

const Litepaper = () => {
  return (
    <DocumentPageWrapper>
      <Head>
        <title>Roadmap - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <aside>
          <HeaderDocs />
        </aside>
        <article>
          <h1>Roadmap</h1>
          <p>
            In our technical roadmap, we outline the required minimum to launch Communa as a product and generate revenue through a <strong>5% fee</strong> on freelancer income.
            The platform operates within a framework where freelancers are paid on a weekly basis.
          </p>

          <br />
          <h3>Here is the workflow:</h3>
          <ol>
            <li>Freelancers and clients connect on the website - <a href="https://communa.network/">https://communa.network</a>.</li>
            <li>Clients publish job listings and assign them to freelancers.</li>
            <li>Freelancers select the assigned job on our TimeTracker and log their unconfirmed working hours.</li>
            <li>Clients review and confirm the freelancer&#39;s work using our smart contract system.</li>
            <li>Freelancers receive payment after deducting a 5% commission.</li>
            <li>The paid hours are securely stored on the blockchain, contributing to the freelancer&#39;s reputation.</li>
            <li>Communa retains a 5% commission from the freelancer&#39;s income.</li>
          </ol>
          <p>This workflow relies on <strong>a website</strong> that gives access to job publishing, freelance search, timesheets, and reports; <strong>a time tracker</strong> desktop app to track automatically time spent while working; and <strong>smart contracts</strong> for instant payment processing of stable coins like USDT.</p>

          <h2 id="website">Website</h2>
          <p>The website facilitates smooth communication between clients and freelancers, allowing clients to post jobs, verify work logs and process payments. </p>
          <aside>
            <h3>💰 Profiles</h3>
            <p>The profile section is where freelancers can view and edit profile information, including their skills, experience, hourly rate, and availability.</p>
          </aside>
          <aside>
            <h3>💼 Jobs</h3>
            <p>The platform will provide clients with the ability to effortlessly publish job listings, enabling them to describe the tasks and requirements in detail. Freelancers will be able to apply for jobs by sending an initial message and specifying their desired hourly rate.</p>
          </aside>
          <aside>
            <h3>📝 Reports</h3>
            <p>Our comprehensive reporting system will automatically track time using our dedicated time-tracking application. The tracked time will be made instantly available for client confirmation, promoting transparency and accuracy. Both freelancers and clients will have access to detailed reports, enabling them to review the tracked time and gain insights into project progress. The system will verify the time logs on the website at the end of each workday or workweek, ensuring reliable and consistent data. The report rendering will be designed to be intuitive and user-friendly, taking inspiration from the effectiveness of Hubstaff.</p>
          </aside >
          <aside>
            <h3>💰 Payments</h3>
            <p>To simplify and streamline the payment process, freelancers will be required to submit timesheets on a weekly basis, specifying the hours worked for each client. Clients will have the responsibility of reviewing the work logs submitted by freelancers and verifying their accuracy. Once confirmed, clients will be able to submit payments to freelancers based on the agreed-upon rates and the hours worked. The system will ensure secure and efficient payment transactions, fostering trust and satisfaction among users</p>
          </aside>
          <aside>
            <h3>Technical requirements</h3>
            <ul>
              <li><a href="https://github.com/communa/communa/blob/main/Frontend.md">https://github.com/communa/communa/blob/main/Frontend.md</a></li>
              <li><a href="https://github.com/communa/communa/blob/main/Backend.md">https://github.com/communa/communa/blob/main/Backend.md</a></li>
            </ul>
          </aside>

          <h2 id="time-tracker">Time Tracker</h2>
          <p>Once a freelancer is assigned to a job, a corresponding project becomes available in our desktop application enabling a freelancer to log hours.</p>
          <aside>
            <h3>⏱️ Automatic time tracking</h3>
            <p>Our time - tracking app will capture various activities such as mouse movements and clicks, ensuring accurate and detailed logs of the freelancer&apos;s work. These logs will be sent to the backend every 10 minutes, providing real-time insights into the freelancer&apos;s productivity.</p>
          </aside>
          <aside>
            <h3>🖥️ Desktop application</h3>
            <p>We are developing a dedicated desktop native application for time tracking, providing freelancers with a user-friendly interface to effortlessly track their work hours.</p>
          </aside>
          <aside>
            <h3>Technical requirements</h3>
            <p>https://github.com/communa/communa/blob/main/TimeTracker.md</p>
          </aside>


          <h2 id="smart-contracts">Smart Contracts</h2>
          <p>In the final stage of the process, we facilitate the seamless transfer of crypto payments for the tracked hours with our smart contract and increase the reputation of a freelancer.  </p>
          <aside>
            <h3>👛 MultiSig wallet</h3>
            <p>For deployment and development purposes we rely on multisig wallets giving us enhanced security and allowing for efficient management of funds.</p>
          </aside>
          <aside>
            <h3>🔖 Payments and reputation</h3>
            <p>Facilitate the needed functionality for payment processing and reputation, leading to a seamless experience with payments released to freelancers in USDT(a stablecoin) on a weekly basis.</p>
          </aside>

          <h2>Business Inquiries</h2>
          <a
            href="https://docs.google.com/forms/d/1nBtimLYE6yHDixAnlNhJ2mcB7gzWwlMCXPCdTxGo6lE"
            target="_blank"
            rel="noreferrer"
          >
            https://docs.google.com/forms/d/1nBtimLYE6yHDixAnlNhJ2mcB7gzWwlMCXPCdTxGo6lE
          </a>
        </article>
      </main>
    </DocumentPageWrapper>
  );
};

export default Litepaper;