import React from "react";
import { Container, Image, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import useTitle from "../../../Hooks/useTitle";

const Blog = () => {
  // useTitle("Blog");
  return (
    <Container className="mt-3 mb-5">
      <Row>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              What are the different ways to manage a state in a React
              application?
            </Accordion.Header>
            <Accordion.Body>
              There are four main types of state we need to properly manage in
              our React apps:
              <ol>
                <li>Local state</li>
                <li>Global state</li>
                <li>Server state</li>
                <li>URL state</li>
              </ol>
              <strong>Local state</strong>: Local state is data we manage in one
              or another component. Local state is most often managed in React
              using the useState hook. For example, local state would be needed
              to show or hide a modal component or to track values for a form
              component, such as form submission, when the form is disabled and
              the values of a form’s inputs.
              <br />
              <strong>Global state</strong>: Global state is data we manage
              across multiple components. Global state is necessary when we want
              to get and update data anywhere in our app, or in multiple
              components at least. A common example of global state is
              authenticated user state. If a user is logged into our app, it is
              necessary to get and change their data throughout our application.
              Sometimes state we think should be local might become global.
              <br />
              <strong>Server state</strong>: Data that comes from an external
              server that must be integrated with our UI state. Server state is
              a simple concept, but can be hard to manage alongside all of our
              local and global UI state. There are several pieces of state that
              must be managed every time you fetch or update data from an
              external server, including loading and error state. Fortunately
              there are tools such as SWR and React Query that make managing
              server state much easier.
              <br />
              <strong>URL state</strong>: Data that exists on our URLs,
              including the pathname and query parameters. URL state is often
              missing as a category of state, but it is an important one. In
              many cases, a lot of major parts of our application rely upon
              accessing URL state. Try to imagine building a blog without being
              able to fetch a post based off of its slug or id that is located
              in the URL! There are undoubtedly more pieces of state that we
              could identify, but these are the major categories worth focusing
              on for most applications you build.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              How does prototypical inheritance work?
            </Accordion.Header>
            <Accordion.Body>
              Inheritance allows an object to use the properties and methods of
              another object without duplicating the code. Every object with its
              methods and properties contains an internal and hidden property
              known as [[Prototype]]. The Prototypal Inheritance is a feature in
              javascript used to add methods and properties in objects. It is a
              method by which an object can inherit the properties and methods
              of another object. Traditionally, in order to get and set the
              [[Prototype]] of an object, we use Object.getPrototypeOf and
              Object.setPrototypeOf. Nowadays, in modern language, it is being
              set using __proto__.
              <br />
              <Image
                src="https://media.geeksforgeeks.org/wp-content/uploads/20200520193336/Untitled-Diagram108.png"
                alt=""
              ></Image>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              What is a unit test? Why should we write unit tests?
            </Accordion.Header>
            <Accordion.Body>
              <strong>Unit Testing:</strong> Unit testing, a testing technique
              using which individual modules are tested to determine if there
              are any issues by the developer himself. It is concerned with
              functional correctness of the standalone modules. The main aim is
              to isolate each unit of the system to identify, analyze and fix
              the defects.
              <br />
              we should write unit tests because it's
              <ol>
                <li>
                  Reduces Defects in the Newly developed features or reduces
                  bugs
                </li>
                <li>when changing the existing functionality. </li>
                <li>
                  Reduces Cost of Testing as defects are captured in very early
                  phase.{" "}
                </li>
                <li>Improves design and allows better refactoring of code. </li>
                <li>
                  Unit Tests, when integrated with build gives the quality of
                  the build as well.
                </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>React vs. Angular vs. Vue?</Accordion.Header>
            <Accordion.Body>
              <strong>Angular</strong> <br />
              The best thing about Angular is its constant updates. Angular
              launches an update every 6 months and the new versions build upon
              the older ones. Take Angular 11 update, for example, which has
              gotten rid of all bugs the previous version had. Of course, you
              need to keep a watch on the updates, as the code may be affected
              in case of a major update. But Google makes sure to wait another 6
              months after an update before pulling the previous tools, giving
              you a full year to change code if the need arises. However, this
              is just the tip of the iceberg. There are several more reasons why
              Angular is a favorite for large scale apps with complex
              functionalities, which wish to scale further.
              <br />
              <strong>React</strong> <br />
              This open-source Javascript library has become quite the rage for
              developing interactive web and mobile apps since Facebook launched
              it in 2013. There are primarily three reasons which have made the
              React library a developer darling - Code Reusability- it allows
              developers to reuse blocks of code for a simple function
              Ease-of-use - React, though tougher than Vue, has a less steep
              learning curve than Angular JS. Customizable - The crucial
              difference between the library and framework is about control.
              This is where React is ahead of Angular- it is highly
              customizable. You are in control and you incorporate the parts of
              the library you need, unlike Angular, which does not allow much
              modification.
              <br />
              <strong>Vue</strong> <br />
              Since Vue is the new kid on the block, not many businesses have
              ventured into Vue JS development yet, and thus, real-time
              assessment of the pros and cons of Vue is not very
              well-documented. However, what we do know is that Vue has the best
              of both worlds- two-way data binding like Angular and flexibility
              in code like React. Because of this, Vue is rising steadily
              through the ranks and has a massive market in Asia- Alibaba and
              Xiaomi are the big names using Vue JS. Hence, the fastest
              JavaScript framework – TezJS, uses Vue as the primary base of the
              language Vue is best utilized in cases of lightweight yet high
              performance, intuitive apps as the applications are quickly ready
              for the market without compromising on the performance or
              functionalities. Let us take a quick look at what makes Vue JS a
              lucrative choice for businesses.
              <br />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  );
};

export default Blog;
