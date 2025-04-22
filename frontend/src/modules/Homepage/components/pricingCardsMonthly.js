import { BsFillPatchCheckFill } from "react-icons/bs";

const BulletPointsStart = () => {
  return (
    <div className="">
      <p class="font-semibold text-gray-500 text-left flex items-center mb-4 ">
        <div className="text-gray-500">
          <BsFillPatchCheckFill />
        </div>
        <span class="pl-2">100 generations monthly</span>
      </p>
      <p class="font-semibold text-gray-500 text-left flex items-center mb-4 ">
        <div className="text-gray-500">
          <BsFillPatchCheckFill />
        </div>
        <span class="pl-2">Ai product descriptions</span>
      </p>
      <p class="font-semibold text-gray-500 text-left flex items-center mb-4 ">
        <div className="text-gray-500">
          <BsFillPatchCheckFill />
        </div>
        <span class="pl-2">Plus other Ai generation tools</span>
      </p>
      <p class="font-semibold text-gray-500 text-left flex items-center mb-4 ">
        <div className="text-gray-500">
          <BsFillPatchCheckFill />
        </div>
        <span class="pl-2">7-day money back guarantee</span>
      </p>
    </div>
  );
};

const BulletPointsGrowth = () => {
  return (
    <div className="">
      <p class="font-semibold text-gray-500 text-left flex items-center mb-4 ">
        <div className="text-gray-500">
          <BsFillPatchCheckFill />
        </div>
        <span class="pl-2">500 generations monthly</span>
      </p>
      <p class="font-semibold text-gray-500 text-left flex items-center mb-4 ">
        <div className="text-gray-500">
          <BsFillPatchCheckFill />
        </div>
        <span class="pl-2">Ai product descriptions</span>
      </p>
      <p class="font-semibold text-gray-500 text-left flex items-center mb-4 ">
        <div className="text-gray-500">
          <BsFillPatchCheckFill />
        </div>
        <span class="pl-2">Plus other Ai generation tools</span>
      </p>
      <p class="font-semibold text-gray-500 text-left flex items-center mb-4 ">
        <div className="text-gray-500">
          <BsFillPatchCheckFill />
        </div>
        <span class="pl-2">7-day money back guarantee</span>
      </p>
    </div>
  );
};

const BulletPointsBusiness = () => {
  return (
    <div className="">
      <p class="font-semibold text-gray-500 text-left flex items-center mb-4 ">
        <div className="text-gray-500">
          <BsFillPatchCheckFill />
        </div>
        <span class="pl-2">500 generations monthly.</span>
      </p>
      <p class="font-semibold text-gray-500 text-left flex items-center mb-4 ">
        <div className="text-gray-500">
          <BsFillPatchCheckFill />
        </div>
        <span class="pl-2">Ai product descriptions</span>
      </p>
      <p class="font-semibold text-gray-500 text-left flex items-center mb-4 ">
        <div className="text-gray-500">
          <BsFillPatchCheckFill />
        </div>
        <span class="pl-2">Plus other Ai generation tools</span>
      </p>
      <p class="font-semibold text-gray-500 text-left flex items-center mb-4 ">
        <div className="text-gray-500">
          <BsFillPatchCheckFill />
        </div>
        <span class="pl-2">7-day money back guarantee</span>
      </p>
    </div>
  );
};

const PricingCards = ({
  freeLink,
  starterLink,
  standardLink,
  businessLink,
  showFree,
}) => {
  return (
    <div>
      <div
        className={`pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   gap-4 mx-auto`}
      >
        <div class=" sm:w-full md:w-76 lg:w-76   p-8  text-center rounded-3xl text-gray-900 border-4 border-gray-200 shadow-xl mx-auto ">
          <div class="font-semibold text-3xl">Starter</div>

          <p class="pt-2 tracking-wide">
            <span class="text-gray-400 align-top">$ </span>
            <span class="text-2xl font-semibold">9</span>
            <span class="text-xl text-grey-700"> /month</span>
          </p>
          <hr class="mt-4 border-1 border-gray-600" />

          <div class="pt-8">
            <BulletPointsStart />

            <a href={starterLink} class="">
              <p class="w-full py-4 bg-blue-500 text-xl mt-8 rounded-xl text-white hover:bg-blue-600">
                <span class="font-medium "> Get Instant Access</span>
              </p>
            </a>
          </div>
        </div>
        <div class="sm:w-full md:w-76 lg:w-76  p-8  text-center rounded-3xl text-gray-900 border-4 border-gray-600 shadow-xl mx-auto ">
          <div class="font-semibold text-3xl">Growth </div>

          <p class="pt-2 tracking-wide">
            <span class="text-gray-400 align-top">$ </span>
            <span class="text-2xl font-semibold">19</span>
            <span class="text-xl text-grey-700"> /month</span>
          </p>
          <hr class="mt-4 border-1 border-gray-600" />
          <div class="pt-8">
            <BulletPointsGrowth />

            <a href={standardLink} class="">
              <p class="w-full py-4 bg-blue-500 text-xl mt-8 rounded-xl text-white hover:bg-blue-600">
                <span class="font-medium "> Get Instant Access</span>
              </p>
            </a>
          </div>
        </div>
        <div class="sm:w-full md:w-76 lg:w-76  p-8  text-center rounded-3xl text-gray-900 border-4 border-gray-200 shadow-xl mx-auto ">
          <div class="font-semibold text-3xl">Lifetime</div>

          <p class="pt-2 tracking-wide">
            <span class="text-gray-400 align-top">$ </span>
            <span class="text-2xl font-semibold">49</span>
            <span class="text-xl text-grey-700"> /once</span>
          </p>
          <hr class="mt-4 border-1 border-gray-400" />
          <div class="pt-8">
            <BulletPointsBusiness />

            <a href={businessLink} class="">
              <p class="w-full py-4 bg-blue-500 text-xl mt-8 rounded-xl text-white hover:bg-blue-600">
                <span class="font-medium "> Get Instant Access</span>
              </p>
            </a>
          </div>
        </div>
      </div>
      <img className="h-6 mt-6 mx-auto rounded-xl" src="/trustBadges.png" />
    </div>
  );
};

export default PricingCards;
