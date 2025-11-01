GitLab CI/CD Pipeline with Docker Hub, Amazon EKS, Prometheus & Grafana
This project demonstrates a complete DevOps automation pipeline built with GitLab CI/CD, Docker, and Amazon EKS, with monitoring and observability provided by Prometheus and Grafana.
It covers containerization, continuous integration, continuous deployment, and cloud-native monitoring.
Overview
The pipeline automates the software delivery process from code commit to production deployment.
Pipeline Stages:
Build – Maven builds the Java project and packages the .jar file.
Test – Maven runs unit tests.
Docker Deploy – Builds Docker image and pushes to Docker Hub.
EKS Cluster Setup & App Deploy – Creates an EKS cluster (if needed) and deploys the container using Kubernetes manifests.
Monitoring – Deploys Prometheus and Grafana using Helm for observability.
GitLab CI/CD Variables
Set the following variables in Settings → CI/CD → Variables in your GitLab project:
Variable	Purpose
DOCKER_USERNAME	Docker Hub username
DOCKER_PASSWORD	Docker Hub password or token
AWS_ACCESS_KEY_ID	AWS IAM key with EKS permissions
AWS_SECRET_ACCESS_KEY	AWS IAM secret key
AWS_DEFAULT_REGION	AWS region for EKS cluster
EKS_CLUSTER_NAME	Name of your Amazon EKS cluster
These variables are used in the pipeline to keep credentials secure.
Repository Structure
File/Directory	Description
.gitlab-ci.yml	GitLab CI/CD pipeline configuration
Dockerfile	Multi-stage Docker build definition
k8s/	Kubernetes deployment and service manifests
prometheus/	Optional Helm values/config files for Prometheus
grafana/	Optional Helm values/config files for Grafana
docs/architecture.png	Architectural diagram of the pipeline
Pipeline Workflow
1️⃣ Build Stage
Uses Maven image maven:3.9.6-eclipse-temurin-17.
Builds the project and creates .jar artifact:
mvn clean package -DskipTests
2️⃣ Test Stage
Runs unit tests on the Maven project:
mvn test
3️⃣ Docker Deploy Stage
Uses docker:latest with Docker-in-Docker (docker:dind) service.
Logs into Docker Hub using GitLab CI/CD variables:
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
docker build -t $DOCKER_IMAGE:latest frontend/
docker push $DOCKER_IMAGE:latest
4️⃣ EKS Cluster Setup
Before deploying your app, ensure an EKS cluster exists. You can create it via AWS CLI:
aws eks create-cluster \
  --name $EKS_CLUSTER_NAME \
  --region $AWS_DEFAULT_REGION \
  --role-arn <EKS_IAM_ROLE_ARN> \
  --resources-vpc-config subnetIds=<SUBNET_IDS>,securityGroupIds=<SECURITY_GROUP_IDS>
Replace <EKS_IAM_ROLE_ARN> with the IAM role ARN that allows EKS to manage resources.
Replace <SUBNET_IDS> and <SECURITY_GROUP_IDS> with your VPC configuration.
Cluster creation can take several minutes.
Configure kubectl
aws eks update-kubeconfig --name $EKS_CLUSTER_NAME --region $AWS_DEFAULT_REGION --kubeconfig $KUBE_CONFIG_PATH
export KUBECONFIG=$KUBE_CONFIG_PATH
kubectl get nodes
5️⃣ Deploy Application to EKS
Apply Kubernetes manifests:
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl rollout status deployment/my-java-app
6️⃣ Monitoring Stage (Prometheus & Grafana)
Uses Helm to deploy Prometheus and Grafana.
Add Helm repos and update:
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
Deploy Prometheus and Grafana:
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
helm install grafana grafana/grafana --namespace monitoring
Access Grafana dashboard via port-forward:
kubectl port-forward svc/grafana 3000:80 -n monitoring
Login using Helm-provided credentials and connect Prometheus as the data source.
Notes
Ensure GitLab Runner supports Docker-in-Docker for building images.
Replace placeholders like <role-arn>, <subnet-ids>, <sg-ids> with your AWS setup.
This document fully reflects your .gitlab-ci.yml pipeline and is followable end-to-end.
Architectural Diagram
Shows flow: GitLab CI/CD → Docker → EKS → Prometheus/Grafana.
Author
Aquila Kuunyangna
DevOps Engineer | 3x AWS Certified | Cloud and Automation Enthusiast
🔗 LinkedIn Profile
