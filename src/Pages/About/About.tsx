import { FC } from "react";

export interface AboutProps {}

const About: FC<AboutProps> = () => {
  return (
    <div className="my-6 font-mono text-left">
      <h1 className="text-xl block text-center font-bold mb-6">
        About Mashup Studio
      </h1>
      <p className="mb-4 text-sm">
        <span className="italic">People like listening to music together.</span>{" "}
        Mashup Studio doesn't capitalize the service by adding a paywall or
        subscription, data selling, tracking online activities, advertisement
        dumping, etc making the listening experience comfy.
      </p>
      <p className="mb-4 text-sm">
        Mashup Studio is a free hobby project developed to make the listening
        experience social and interactive. If you like the project, do share it
        with your friends and family. You can also support the development and
        maintenance of Mashup Studio by donating through the link below.
      </p>
    </div>
  );
};

export default About;
