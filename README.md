# GitLab CI/CD Pipeline with Docker Hub, Amazon EKS, Prometheus and Grafana

This project demonstrates a complete DevOps automation pipeline built with GitLab CI/CD, Docker, and Amazon EKS, with monitoring and observability provided by Prometheus and Grafana. It covers containerization, continuous integration, continuous deployment, and cloud-native monitoring.

---

##  Overview

The pipeline automates the entire software delivery process, from code commit to production deployment. It builds, tests, pushes, and deploys Docker images to an EKS cluster using GitLab CI/CD.

### Core Tools and Technologies
- **CI/CD:** GitLab CI  
- **Containerization:** Docker  
- **Artifact Repository:** Docker Hub  
- **Orchestration:** Amazon Elastic Kubernetes Service (EKS)  
- **Monitoring:** Prometheus and Grafana  

---

##  Pipeline Stages

1. **Build** – Packages the application into a Docker image using a multi-stage Dockerfile.  
2. **Test** – Runs unit and integration tests.  
3. **Push** – Uploads the Docker image to Docker Hub with automated version tagging.  
4. **Deploy** – Deploys the container to Amazon EKS using Kubernetes manifests.

Each stage runs automatically on every code commit for reliable, consistent deployments.

---

## 📂 Repository Structure

| File/Directory | Description |
|----------------|-------------|
| `.gitlab-ci.yml` | GitLab CI/CD pipeline configuration |
| `Dockerfile` | Multi-stage Docker build definition |
| `k8s/` | Kubernetes deployment and service manifests |
| `prometheus/` | Prometheus configuration files |
| `grafana/` | Grafana data source and dashboard configuration |

---

##  Deployment Workflow

1. Developer pushes code to GitLab.  
2. GitLab Runner triggers the CI/CD pipeline.  
3. The pipeline builds and pushes the Docker image to Docker Hub.  
4. Deployment applies manifests to the EKS cluster.  
5. Prometheus scrapes metrics from workloads.  
6. Grafana visualizes performance data and metrics.

This provides continuous delivery and real-time system visibility.

---

##  Pipeline and Monitoring Screenshots  

###  GitLab CI/CD Pipeline  
![GitLab CI/CD Pipeline](./images/gitlab-pipeline.png)

###  Kubernetes Cluster Monitoring (Grafana)  
![Grafana Dashboard](./images/grafana-dashboard.png)

###  Application Running on EKS  
![EKS Application](./images/eks-app.png)

> Screenshots illustrate successful CI/CD automation, container deployment, and monitoring setup.

---

##  Monitoring and Observability

Prometheus collects metrics from Kubernetes components and pods.  
Grafana visualizes CPU, memory, and network metrics, enabling observability into cluster health.

Alerting rules can also be added for proactive monitoring.

---

##  Future Enhancements

- Add **IAM Roles for Service Accounts (IRSA)** for better security  
- Deploy with **Helm charts** for version-controlled releases  
- Integrate **Slack or email notifications** for pipeline results  
- Extend monitoring with **application-level metrics**

---

##  Author

**Aquila Kuunyangna**  
DevOps Engineer | **3x AWS Certified** | Cloud and Automation Enthusiast  
🔗 [LinkedIn Profile](https://www.linkedin.com/in/aquila-kuunyangna-32a412195)

---

3. Run:
   ```bash
   git add README.md images/
   git commit -m "Added screenshots and updated README"
   git push origin main
