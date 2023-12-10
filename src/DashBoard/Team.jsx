import { Card } from "flowbite-react";

const Team = () => {
  return (
    <div className="px-20 mb-10">
      <h1 className="text-center mt-4 bg-[#0891B2] text-white font-semibold py-2 ">
        Team AWS
      </h1>
      <div className="grid grid-cols-3 gap-5 mt-6 mb-6">
        <Card>
          <img
            className="max-w-full h-62"
            alt="Meaningful alt text for an image that is not purely decorative"
            src="../../src/images/357772075_283305974210552_3393920507529656284_n.jpg"
          />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Ceo
          </h5>
          <h5 className="text-1xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Tanjim AL Fahim
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </Card>
        <Card>
          <img
            className="max-w-full h-62"
            alt="Meaningful alt text for an image that is not purely decorative"
            src="../../src/images/1673078179358.jpeg"
          />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Arena DevOps
          </h5>
          <h5 className="text-1xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Sarwar Alam
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </Card>
        <Card>
          <img
            className="max-w-full h-62"
            alt="Meaningful alt text for an image that is not purely decorative"
            src="../../src/images/Capture.PNG"
          />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Team Delta
          </h5>
          <h5 className="text-1xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Anika Tabassum Nira
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Team;
