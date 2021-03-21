import React, { ReactNode } from "react"
import "./UploadPage.css"
import Drop from "./DropZone"
import Results from "./../../components/results/Results"
import { Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { PieChart } from "react-minimal-pie-chart"
import runUpload from "./../../services/upload"
import PieElement from "../../customTypes/PieElement";
import { LabelStyles } from "../../customTypes/UploadBoxStyle"
import PlagResult from "../../customTypes/PlagiarismData"

const uploaded: boolean = true
const notUploaded: boolean = false

const defaultLabelStyle: LabelStyles = {
  fontSize: "25%",
  fontFamily: "Lucida Console, Courier, monospace",  
}

interface UploadState {
  file1Uploaded: boolean
  file2Uploaded: boolean
  displayResult: boolean
  displayProgress: boolean
  enableRunButton: boolean
  submission1Files: Array<File>;
  submission2Files: Array<File>;
  displayCompare: boolean;
  displayError: string | undefined;
  score: number;
}

interface UploadProps {
  toggleEmptyCheck: Function
}

export default class Upload extends React.Component<UploadProps, UploadState> {
  constructor(props: UploadProps) {
    super(props)
    this.state = {
      file1Uploaded: notUploaded,
      file2Uploaded: notUploaded,
      displayResult: false,
      enableRunButton: false,
      displayProgress: false,
      submission1Files: [],
      submission2Files: [],
      displayCompare: false,
      displayError: "",
      score: 0,
    }

    this.uploadFile1 = this.uploadFile1.bind(this)
    this.uploadFile2 = this.uploadFile2.bind(this)
    this.runPlagiarism = this.runPlagiarism.bind(this)
  }

  /* Check for plagiarism, disable until the upload is completed. */
  componentDidUpdate(): void {
    if (!this.state.enableRunButton) {
      const { file1Uploaded, file2Uploaded } = this.state
      if (file1Uploaded === uploaded && file2Uploaded === uploaded) {
        this.setState({ enableRunButton: true })
      }
    }
  }

  uploadFile1(submissionFile: Array<File>): void {
    this.setState({ file1Uploaded: true })
    this.setState({ submission1Files: submissionFile })
  }

  uploadFile2(submissionFile: Array<File>): void {
    this.setState({ file2Uploaded: true })
    this.setState({ submission2Files: submissionFile })
  }

  async runPlagiarism():  Promise<void>  {
    //dispaly progress bar
    await this.setState({
      displayProgress: true,
      displayResult: false,
      displayCompare: false,
      displayError:"",
    })

    //api call to backend

    const data: Array<PlagResult> = await runUpload([
      this.state.submission1Files,
      this.state.submission2Files,
    ])
    //temperory fix for errors
    if (data[0].hasOwnProperty("message")) {
      this.setState({
        displayError: data[0].message,
      })
    } else {
      localStorage.setItem("data", JSON.stringify(data[0]))
      await this.setState({
        displayResult: true,
      })

      if (data[0].score !== 0) {
        await this.setState({
          displayCompare: true,
          score: data[0].score,
        })
      }
      const result:HTMLElement|null  = document.getElementById("result")
      result?.scrollIntoView({ behavior: "smooth" })
      //hide progress bar
      await this.setState({
        displayProgress: false,
      })

      this.props.toggleEmptyCheck()
    }
  }

  data: Function = (): Array<PieElement> => {
    let { score } = this.state
    score = parseInt(score.toFixed(2))
    return [
      { title: "Plagiarised", value: score, color: "#C13C37" },
      { title: "Not Plagiarised", value: 100 - score, color: "#02A938" },
    ]
  }

  render(): ReactNode {
    return (
      <div className="m-4 page-container">
        <h1 className="center upload-text">
          Upload Folders To Detect For Plagiarism
        </h1>
        <h3 className="m-4 center directions">
          <span>
          Please upload two submissions to run plagiarism. Supported formats for
          file transfer: .js <span className="size">(Max size: 15MB)</span></span> 
        </h3>
        <div className="container-fluid mx-auto">
          <div className=" mt-4 center sub-style">
            <Drop
              onChange={this.uploadFile1}
              submission={this.state.submission1Files}
            />
          </div>

          <div className="mt-4 center sub-style">
            <Drop
              onChange={this.uploadFile2}
              submission={this.state.submission2Files}
            />
          </div>

          <div className="col-sm mt-4 center">
            <Button
              disabled={!this.state.enableRunButton}
              className="btn border rounded check-button text-light p-2"
              onClick={this.runPlagiarism}
            >
              <i className="fas fa-search">
                <span
                  style={{ fontFamily: "Lucida Console, Courier, monospace" }}
                >
                  Check Plagiarism{" "}
                </span>
              </i>
            </Button>
          </div>
          {this.state.displayError && (
              <p className="center mt-3 error">
                <code>{this.state.displayError}</code>
              </p>
          )}
          {this.state.displayResult && (
            <div id="result" className="mt-2 p-4 center row">
              <div className="mt-4 center sub-style">
                <Results score={Math.round(this.state.score)} />
              </div>

              {this.state.displayCompare && (
                <div className="mt-4 center sub-style">
                  <LinkContainer to="/codecomparison">
                    <Button className="btn border rounded check-button text-light p-2">
                      <i className="far fa-file-code">
                        {" "}
                        <span
                          style={{
                            fontFamily: "Lucida Console, Courier, monospace",
                          }}
                        >
                          Compare
                        </span>
                      </i>
                    </Button>
                  </LinkContainer>
                </div>
              )}

              <div className="mt-4 sub-style">
                <PieChart
                  animate
                  animationDuration={500}
                  animationEasing="ease-out"
                  data={this.data()}
                  label={({ dataEntry }): string => {
                    if (dataEntry.value === 0) {
                      return (dataEntry.title = "")
                    }
                    return dataEntry.title + ":" + dataEntry.value + "%"
                  }}
                  labelStyle={{
                    ...defaultLabelStyle,
                  }}
                  radius={50}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
