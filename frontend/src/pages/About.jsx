import { motion } from "framer-motion";
import Navbar from "./Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
   <>
   <Navbar/>
    <section className=" min-h-screen py-20 px-4 mr-10">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800 mb-4">
            About Our School
          </h1>
          <p className="text-purple-700 max-w-2xl mx-auto text-lg">
            Building bright futures through quality education, strong values,
            and modern learning.
          </p>
        </motion.div>

        {/* Main Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">

          {/* Left Text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              Who We Are
            </h2>
            <p className="text-purple-700 leading-relaxed mb-4">
              Our school is a trusted educational institution dedicated to
              academic excellence and character development. We provide a safe,
              supportive, and inspiring environment.
            </p>
            <p className="text-purple-700 leading-relaxed">
              With experienced teachers and modern teaching methods, we nurture
              confidence, creativity, and discipline in every student.
            </p>
          </motion.div>

          {/* Right Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-purple-600 text-white rounded-2xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
            <ul className="space-y-3 text-purple-100">
              <li>✔ Quality education for every student</li>
              <li>✔ Strong moral and ethical values</li>
              <li>✔ Safe and friendly environment</li>
              <li>✔ Personal and academic growth</li>
            </ul>
          </motion.div>

        </div>

        {/* Vision / Mission / Values */}
        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              title: "Our Vision",
              text: "To empower students with knowledge, confidence, and values for a successful future.",
            },
            {
              title: "Our Mission",
              text: "To provide high-quality education through innovation and a student-centered approach.",
            },
            {
              title: "Our Values",
              text: "Respect, discipline, honesty, teamwork, and lifelong learning.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-purple-800 mb-3">
                {item.title}
              </h3>
              <p className="text-purple-700">{item.text}</p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
   </>
  );
};

export default About;
