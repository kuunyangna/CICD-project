

# GitLab CI/CD Pipeline with Docker Hub, Amazon EKS, Prometheus & Grafana

This project demonstrates a **complete DevOps automation pipeline** built with **GitLab CI/CD**, **Docker**, and **Amazon EKS**, with monitoring and observability provided by **Prometheus** and **Grafana**.  

It covers containerization, continuous integration, continuous deployment, and cloud-native monitoring.

---

## Overview

The pipeline automates the software delivery process from **code commit to production deployment**.  

**Pipeline Stages:**

1. **Build** – Maven builds the Java project and packages the `.jar` file.  
2. **Test** – Maven runs unit tests.  
3. **Docker Deploy** – Builds Docker image and pushes to Docker Hub.  
4. **EKS Cluster Setup & App Deploy** – Creates an EKS cluster (if needed) and deploys the container using Kubernetes manifests.  
5. **Monitoring** – Deploys Prometheus and Grafana using Helm for observability.

---

## GitLab CI/CD Variables

Set the following variables in **Settings → CI/CD → Variables** in your GitLab project:

| Variable | Purpose |
|----------|--------|
| `DOCKER_USERNAME` | Docker Hub username |
| `DOCKER_PASSWORD` | Docker Hub password or token |
| `AWS_ACCESS_KEY_ID` | AWS IAM key with EKS permissions |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key |
| `AWS_DEFAULT_REGION` | AWS region for EKS cluster |
| `EKS_CLUSTER_NAME` | Name of your Amazon EKS cluster |

> These variables are used in the pipeline to keep credentials secure.

---

## Repository Structure

| File/Directory | Description |
|----------------|-------------|
| `.gitlab-ci.yml` | GitLab CI/CD pipeline configuration |
| `Dockerfile` | Multi-stage Docker build definition |
| `k8s/` | Kubernetes deployment and service manifests |
| `prometheus/` | Optional Helm values/config files for Prometheus |
| `grafana/` | Optional Helm values/config files for Grafana |
| `docs/architecture.png` | Architectural diagram of the pipeline |

---

## Pipeline Workflow

Build Stage

- Uses Maven image `maven:3.9.6-eclipse-temurin-17`.  
- Builds the project and creates `.jar` artifact:

```bash
mvn clean package -DskipTests

 Test Stage

Runs unit tests on the Maven project:

```bash
mvn test
 Docker Deploy Stage

Uses `docker:latest` with Docker-in-Docker (`docker:dind`) service.  

Logs into Docker Hub using GitLab CI/CD variables and builds/pushes the Docker image:

```bash
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
docker build -t $DOCKER_IMAGE:latest frontend/
docker push $DOCKER_IMAGE:latest

## EKS Cluster Setup

Create an Amazon EKS cluster using AWS CLI and configure `kubectl` to access it.

```bash
# Create EKS cluster
aws eks create-cluster \
  --name $EKS_CLUSTER_NAME \
  --region $AWS_DEFAULT_REGION \
  --role-arn <EKS_IAM_ROLE_ARN> \
  --resources-vpc-config subnetIds=<SUBNET_IDS>,securityGroupIds=<SECURITY_GROUP_IDS>

# Configure kubectl
aws eks update-kubeconfig --name $EKS_CLUSTER_NAME --region $AWS_DEFAULT_REGION --kubeconfig $KUBE_CONFIG_PATH
export KUBECONFIG=$KUBE_CONFIG_PATH

# Check cluster nodes
kubectl get nodes

## Deploy Application to EKS

Apply Kubernetes manifests to deploy your application:

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl rollout status deployment/my-java-app

## Add Helm Repositories for Monitoring

Before deploying Prometheus and Grafana, add their Helm repositories and update them:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

## Deploy Prometheus & Grafana using Helm

Once Helm repositories are added, deploy Prometheus and Grafana:

```bash
# Deploy Prometheus
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace

# Deploy Grafana
helm install grafana grafana/grafana --namespace monitoring

## Access Grafana Dashboard

After deploying Grafana, you can access the dashboard locally using `kubectl port-forward`:

```bash
kubectl port-forward svc/grafana 3000:80 -n monitoring

## Architectural Diagram

The architecture flow of the pipeline is as follows:
GitLab CI/CD → Docker Hub → Amazon EKS → Prometheus/Grafana Monitoring


This shows the end-to-end DevOps automation and monitoring setup.

---

## Author

Aquila Kuunyangna
DevOps Engineer | 3x AWS Certified | Cloud and Automation Enthusiast  

[LinkedIn Profile](https://www.linkedin.com/in/kuunyangna)







