import Indecision from "@/components/Indecision";
import { shallowMount } from "@vue/test-utils";

describe("Indecision Component", () => {
  let wrapper;
  let consoleLogSpy;
  global.fetch = jest.fn();
  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    consoleLogSpy = jest.spyOn(console, "log");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function setMockFetch(response = null, isOk = false) {
    return () => {
      if (isOk) {
        return Promise.resolve({
          json: () => Promise.resolve(response),
        });
      } else {
        return Promise.reject({
          json: () =>
            Promise.reject({
              statusCode: 500,
            }),
        });
      }
    };
  }

  it("should match snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should not trigger anything when answer dont have '?'", async () => {
    const input = wrapper.find("input");
    //THIS VM has mock of functions, getter and setter for data
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    await input.setValue("Hola mundo");
    expect(consoleLogSpy).toHaveBeenCalled();
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  it("should trigger getAnswer when answer have '?'", async () => {
    const input = wrapper.find("input");
    //THIS VM has mock of functions, getter and setter for data
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    await input.setValue("Hola mundo?");
    getAnswerSpy.mockResolvedValue("yes");
    //fetch is not defined in node so we have to mock it...

    expect(consoleLogSpy).toHaveBeenCalled();
    expect(getAnswerSpy).toHaveBeenCalled();
  });

  it("should return reponse when getAnswer method is called and answer is yes", async () => {
    const urlImage = "urlimage";
    const apiResponse = { answer: "yes", forced: false, image: urlImage };
    fetch.mockImplementationOnce(setMockFetch(apiResponse, true));
    await wrapper.vm.getAnswer();
    const img = wrapper.find("img");
    expect(wrapper.vm.img).toBe(urlImage);
    expect(img.exists()).toBeTruthy();
    expect(wrapper.vm.answer).toBe("Si :D");
  });

  it("should return reponse when getAnswer method is called and answer is no", async () => {
    const urlImage = "urlimage";
    const apiResponse = { answer: "no", forced: false, image: urlImage };
    fetch.mockImplementationOnce(setMockFetch(apiResponse, true));
    await wrapper.vm.getAnswer();
    const img = wrapper.find("img");
    expect(wrapper.vm.img).toBe(urlImage);
    expect(img.exists()).toBeTruthy();
    expect(wrapper.vm.answer).toBe("No :(");
  });

  it("should return reponse when getAnswer method is called and answer is other answer", async () => {
    const urlImage = "urlimage";
    const apiResponse = {
      answer: "i dont know",
      forced: false,
      image: urlImage,
    };
    fetch.mockImplementationOnce(setMockFetch(apiResponse, true));
    await wrapper.vm.getAnswer();
    const img = wrapper.find("img");
    expect(wrapper.vm.img).toBe(urlImage);
    expect(img.exists()).toBeTruthy();
    expect(wrapper.vm.answer).toBe("No sé ._.");
  });

  it("should return error when getAnswer method is called", async () => {
    fetch.mockImplementationOnce(setMockFetch());
    await wrapper.vm.getAnswer();
    const img = wrapper.find("img");
    expect(wrapper.vm.img).toBe(null);
    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe("No hay respues del API");
  });
});
