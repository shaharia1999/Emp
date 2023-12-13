import { Card } from "flowbite-react";



const DevOps = () => {
    return (
      <>
    
     
        <div className="px-20">
            <h1 className="text-center mt-5 font-semibold text-2xl bg-[#0891B2]  py-2 text-white">Team DevOps</h1>
            <div className="grid grid-cols-3 gap-5 mt-6 mb-6">
            <Card className="cursor-pointer" >
          <img
            className="max-w-full h-62 "
            alt="Meaningful alt text for an image that is not purely decorative"
            src="../../src/images/ifty.png"
            // src="../../src/images/357772075_283305974210552_3393920507529656284_n.jpg"
          />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Team Leader
          </h5>
          <h5 className="text-1xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Sarwar Alam
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </Card>
            <Card className="cursor-pointer" >
          <img
            className="max-w-full h-62 "
            alt="Meaningful alt text for an image that is not purely decorative"
            src="../../src/images/sha.png"
            // src="../../src/images/357772075_283305974210552_3393920507529656284_n.jpg"
          />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Front-End Developer
          </h5>
          <h5 className="text-1xl font-semibold tracking-tight text-gray-900 dark:text-white">
            MD Shaharia
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </Card>
            <Card className="cursor-pointer" >
          <img
            className="max-w-full h-62 "
            alt="Meaningful alt text for an image that is not purely decorative"
            src="../../src/images/pexels-chloe-1043474.png"
            // src="../../src/images/357772075_283305974210552_3393920507529656284_n.jpg"
          />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Back-End Developer
          </h5>
          <h5 className="text-1xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Alex
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </Card>
        </div>

            
        </div>
        </>
    );
};

export default DevOps;