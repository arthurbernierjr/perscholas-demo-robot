const FAQ = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-8 my-8">
      <h2 className="text-4xl font-bold tracking-wide uppercase text-gray-900 flex justify-center mb-12">
        🧠 FAQ
      </h2>
      <ul className="flex items-start gap-5 flex-wrap justify-center whitespace-normal items-center">
        <li className="md:w-2/5   px-6 py-3 md:px-12 md:py-6 ">
          <p className="text-lg font-medium leading-6 text-gray-900 font-semibold">
            How much is a generation worth?
          </p>
          <p className="mt-2">
            <p className="text-base leading-6 text-gray-600">
              Each generation is one AI creation. E.g. one product description
              is one generation.
            </p>
          </p>
        </li>
        <li className="md:w-2/5   px-6 py-3 md:px-12 md:py-6 ">
          <p className="text-lg font-medium leading-6 text-gray-900 font-semibold">
            What's created in each description generated?
          </p>
          <p className="mt-2">
            <p className="text-base leading-6 text-gray-600">
              A detailed product description, a SEO optimized title, and a SEO
              meta description.
            </p>
          </p>
        </li>
        <li className="md:w-2/5   px-6 py-3 md:px-12 md:py-6 ">
          <p className="text-lg font-medium leading-6 text-gray-900 font-semibold">
            Does this work on mobile?
          </p>
          <p className="mt-2">
            <p className="text-base leading-6 text-gray-600">
              Copywriting Robot can access it from whatever device or browser
              you choose. Whether it be Mac, PC, or mobile.
            </p>
          </p>
        </li>
        <li className="md:w-2/5   px-6 py-3 md:px-12 md:py-6 ">
          <p className="text-lg font-medium leading-6 text-gray-900 font-semibold">
            What platforms it integrate with?
          </p>
          <p className="mt-2">
            <p className="text-base leading-6 text-gray-600">
              Any platform! Including Shopify, Woocommerce, Wix, Amazon, and
              more. Our bulk description generator creates a CSV file. Which can
              be used to update the products of any store.
            </p>
          </p>
        </li>
        <li className="md:w-2/5   px-6 py-3 md:px-12 md:py-6 ">
          <p className="text-lg font-medium leading-6 text-gray-900 font-semibold">
            Is payment secure?
          </p>
          <p className="mt-2">
            <p className="text-base leading-6 text-gray-600">
              Yes, we use Stripe for payment. We do not store any of your credit
              card information.
            </p>
          </p>
        </li>
        <li className="md:w-2/5   px-6 py-3 md:px-12 md:py-6 ">
          <p className="text-lg font-medium leading-6 text-gray-900 font-semibold">
            Can I get an invoice?
          </p>
          <p className="mt-2">
            <p className="text-base leading-6 text-gray-600">
              Yes, you can get an invoice for your purchase. Head to the invoice
              page after purchase, add your details and save to PDF.
            </p>
          </p>
        </li>
        <li className="md:w-2/5   px-6 py-3 md:px-12 md:py-6 ">
          <p className="text-lg font-medium leading-6 text-gray-900 font-semibold">
            What if I want a refund?
          </p>
          <p className="mt-2">
            <p className="text-base leading-6 text-gray-600">
              All of our plans come with a 7-day money back guarantee.
            </p>
          </p>
        </li>
        <li className="md:w-2/5   px-6 py-3 md:px-12 md:py-6 ">
          <p className="text-lg font-medium leading-6 text-gray-900 font-semibold">
            What languages does it work with?
          </p>
          <p className="mt-2">
            <p className="text-base leading-6 text-gray-600">
              It works with 10+ languages.
            </p>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default FAQ;
