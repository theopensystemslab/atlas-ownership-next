import Image from "next/image"
import NoopLayout from "../components/layout/NoopLayout"

const AboutPage = () => {
  return (
    <div className="flex">
      <div className="w-1/3">
        <h1 className="text-5xl font-semibold mb-12">
          Other forms of <br />
          ownership are possible.
        </h1>
        <div className="flex flex-col w-3/4">
          <p className="mb-3">
            What <em>is</em> ownership? The answer seems obvious, until you
            think about it. How is it possible for us to &quot;own&quot; a piece
            of the earth? Land was there long before us, and will be there long
            after us.
          </p>
          <p className="mb-3">
            In truth, property is a piece of paper, a contract, giving you
            rights over a place.
          </p>
          <p className="mb-3">
            Ownership of land is a form of power, and it always has been. And
            that power shapes almost everything about our lives, our society,
            our environment, and our economy. Your legal relationship with the
            place where you live defines your security, your wellbeing and your
            wealth.
          </p>
          <p className="mb-3">
            Today, property (or &quot;real estate&quot;) is the single largest
            form of wealth on the planet. Our property system underpins almost
            every crisis flooding across our timelines every day, from
            inequality to climate collapse and economic stagnation. And yet we
            don’t even really have the language to talk about it.
          </p>
          <p className="mb-3">This Atlas is an attempt to change that.</p>
          <p className="mb-3">
            Other forms of ownership and tenure are possible. In fact, they are
            already here. Many have been around for thousands of years. Right
            now, all around the world, communities and countries are designing
            new, fairer ways to own and steward land and buildings. Historians
            are rediscovering ancient, traditional and indigenous models of
            ownership.
          </p>
          <p className="mb-3">
            This atlas has been created as a tool to help map that knowledge.
            Anyone can contribute, and the knowledge belongs to everyone.
          </p>
          <p className="mb-3">
            Why? Because redesigning how we own land and property is the single
            most important reform project of our century. There is no path to a
            successful, flourishing future for humanity that does not include
            it.
          </p>
          <p className="mb-3">
            The solutions that we need to build that future are already here, we
            just need to find them.
          </p>
          <blockquote className="mb-3 text-gray-400">
            “The ultimate, hidden truth of the world is that it is something
            that we make, and could just as easily make differently” – David
            Graeber
          </blockquote>
        </div>
      </div>
      <div className="w-2/3 relative flex items-center justify-center">
        <Image
          src="/images/real-estate-value-diagram-reverse.svg"
          alt="Real estate value comparison diagram"
          layout="fill" // parent must have position set
          style={{ WebkitFilter: "invert(100%)", filter: "invert(100%)" }}
        />
      </div>
    </div>
  )
}

AboutPage.getLayout = NoopLayout

export default AboutPage
