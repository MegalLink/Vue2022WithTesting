import Counter from "@/components/Counter";
import { shallowMount } from "@vue/test-utils";
describe("Counter components", () => {
  let wrapper;
  let buttons;
  beforeEach(() => {
    wrapper = shallowMount(Counter);
    buttons = wrapper.findAll("button");
  });

  it("should match snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render deafult title 'Counter'", () => {
    let h2 = wrapper.find('[test-id="title"]');
    expect(h2.text()).toBe("Counter");
  });

  it("should render have default counter value '10'", () => {
    let span = wrapper.find("span");
    expect(span.text()).toBe("10");
  });

  it("should increase counter by one", async () => {
    await buttons[0].trigger("click");
    let counterText = wrapper.find("span").text();
    expect(counterText).toBe("11");
  });

  it("should decrease counter by one", async () => {
    await buttons[1].trigger("click");
    let counterText = wrapper.find("span").text();
    expect(counterText).toBe("9");
  });
});
