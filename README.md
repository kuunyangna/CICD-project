GitLab CI/CD Pipeline with Docker Hub, Amazon EKS, Prometheus & Grafana

This project demonstrates a complete DevOps automation pipeline built with GitLab CI/CD, Docker, and Amazon EKS, with monitoring and observability provided by Prometheus and Grafana.

🚀 Overview

The pipeline automates the software delivery process from code commit to production deployment.

Pipeline Stages

Build – Maven builds the Java project and packages the .jar file
Test – Maven runs unit tests
Docker Deploy – Builds Docker image and pushes to Docker Hub
EKS Cluster Setup & App Deploy – Creates EKS cluster and deploys container
Monitoring – Deploys Prometheus and Grafana using Helm
Prerequisites

GitLab Account with repository
Docker Hub Account
AWS Account with appropriate permissions
GitLab Runner with Docker support
Helm
GitLab CI/CD Variables

Set in Settings → CI/CD → Variables:

Variable	Purpose
DOCKER_USERNAME	Docker Hub username
DOCKER_PASSWORD	Docker Hub password/token
AWS_ACCESS_KEY_ID	AWS IAM key with EKS permissions
AWS_SECRET_ACCESS_KEY	AWS IAM secret key
AWS_DEFAULT_REGION	AWS region for EKS cluster
EKS_CLUSTER_NAME	Name of EKS cluster

Repository Structure

text
├── .gitlab-ci.yml          # Pipeline configuration
├── Dockerfile              # Multi-stage Docker build
├── k8s/                    # Kubernetes manifests
│   ├── deployment.yaml
│   └── service.yaml
├── prometheus/             # Helm config for Prometheus
├── grafana/                # Helm config for Grafana
└── docs/
    └── architecture.png    # Architecture diagram
🔄 Pipeline Workflow

1️⃣ Build Stage

bash
mvn clean package -DskipTests
2️⃣ Test Stage

bash
mvn test
3️⃣ Docker Deploy Stage

bash
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
docker build -t $DOCKER_IMAGE:latest frontend/
docker push $DOCKER_IMAGE:latest
4️⃣ EKS Cluster Setup

Create EKS cluster (one-time setup):

bash
aws eks create-cluster \
  --name $EKS_CLUSTER_NAME \
  --region $AWS_DEFAULT_REGION \
  --role-arn <EKS_IAM_ROLE_ARN> \
  --resources-vpc-config subnetIds=<SUBNET_IDS>,securityGroupIds=<SECURITY_GROUP_IDS>
Configure kubectl:

bash
aws eks update-kubeconfig --name $EKS_CLUSTER_NAME --region $AWS_DEFAULT_REGION --kubeconfig $KUBE_CONFIG_PATH
export KUBECONFIG=$KUBE_CONFIG_PATH
kubectl get nodes

Deploy Application to EKS

bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl rollout status deployment/my-java-app

Monitoring Stage

Add Helm repos:

bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
Deploy monitoring stack:

bash
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
helm install grafana grafana/grafana --namespace monitoring
Access Grafana:

bash
kubectl port-forward svc/grafana 3000:80 -n monitoring
Monitoring & Observability

Prometheus: Metrics collection and storage
Grafana: Visualization and dashboards
Default Dashboards: Kubernetes cluster metrics and application monitoring
Technologies Used

GitLab CI/CD, Docker, Amazon EKS
Helm, Prometheus, Grafana
Maven, Kubernetes
Notes

Ensure GitLab Runner supports Docker-in-Docker
Replace AWS placeholders with your actual setup
EKS cluster creation takes several minutes
Monitor resource usage for Prometheus

Architecture Flow

GitLab CI/CD → Docker Hub → Amazon EKS → Prometheus/Grafana Monitoring

👨‍💻 Author

Aquila Kuunyangna
DevOps Engineer | 3x AWS Certified | Cloud and Automation Enthusiast

