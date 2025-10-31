# GitLab CI/CD Pipeline with Docker Hub, Amazon EKS, Prometheus and Grafana

This project demonstrates a complete DevOps automation pipeline built with GitLab CI/CD, Docker, and Amazon EKS, with monitoring and observability provided by Prometheus and Grafana. It covers containerization, continuous integration, continuous deployment, and cloud-native monitoring.

---

## Overview

The pipeline automates the entire software delivery process, from code commit to production deployment. It builds, tests, pushes, and deploys Docker images to an EKS cluster using GitLab CI/CD.

Core tools and technologies:

- CI/CD: GitLab CI  
- Containerization: Docker  
- Artifact Repository: Docker Hub  
- Orchestration: Amazon Elastic Kubernetes Service (EKS)  
- Monitoring: Prometheus and Grafana  
- Language or Framework: specify your application type (for example, Node.js, Python, or React)

---

## Pipeline Stages

1. Build – Packages the application into a Docker image using a multi-stage Dockerfile.  
2. Test – Runs unit and integration tests to verify the build.  
3. Push – Uploads the Docker image to Docker Hub with automated version tagging.  
4. Deploy – Deploys the container to Amazon EKS using Kubernetes manifests.

Each stage runs automatically on every code commit to ensure reliable and consistent deployments.

---

## Repository Structure

| File or Directory | Description |
|-------------------|-------------|
| .gitlab-ci.yml | GitLab CI/CD pipeline configuration |
| Dockerfile | Multi-stage Docker build definition |
| k8s/ | Kubernetes deployment and service manifests |
| prometheus/ | Prometheus configuration files |
| grafana/ | Grafana data source and dashboard configuration |

---

## Deployment Workflow

1. A developer pushes code to the GitLab repository.  
2. The GitLab Runner triggers the CI/CD pipeline.  
3. The pipeline builds and tags the Docker image, then pushes it to Docker Hub.  
4. The deployment job applies Kubernetes manifests to the EKS cluster.  
5. Prometheus scrapes metrics from running pods and cluster components.  
6. Grafana displays the metrics in dashboards for performance monitoring.

This workflow provides continuous delivery and real-time visibility into system health.

---

## Monitoring and Observability

Prometheus is deployed using Helm and configured to collect metrics from Kubernetes components and workloads.  
Grafana connects to Prometheus as a data source to visualize performance metrics such as CPU and memory usage.  
Alerting rules can be added in Prometheus for proactive system monitoring.

---

## Future Enhancements

- Integrate IAM Roles for Service Accounts (IRSA) to improve security and access control.  
- Add Helm charts for version-controlled and repeatable deployments.  
- Configure Slack or email notifications for pipeline results.  
- Extend monitoring with custom application-level metrics.

---

## Author

Aquila Kuunyangna
DevOps Engineer | 3x AWS Certified | Cloud and Automation Enthusiast  
LinkedIn: [https://www.linkedin.com/in/aquila-kuunyangna-32a412195](https://www.linkedin.com/in/aquila-kuunyangna-32a412195)
