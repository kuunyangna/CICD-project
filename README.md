
Absolutely! I’ve updated your README Markdown so that both GitLab CI/CD variables and repository structure are fully tabulated and easy to read. The rest of the content is kept intact.
# GitLab CI/CD Pipeline with Docker Hub, Amazon EKS, Prometheus & Grafana

## 📋 Project Overview

A **complete DevOps automation pipeline** implementing modern CI/CD practices with full monitoring stack.

---

## 🏗️ Architecture Flow

**GitLab CI/CD → Docker Hub → Amazon EKS → Prometheus/Grafana Monitoring**

---

## 🔄 Pipeline Stages

### 1️⃣ Build Stage

```bash
mvn clean package -DskipTests
Tool: Maven 3.9.6
Output: Java .jar package
2️⃣ Test Stage
mvn test
Purpose: Unit testing
Framework: Maven Surefire
3️⃣ Docker Deploy Stage
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
docker build -t $DOCKER_IMAGE:latest frontend/
docker push $DOCKER_IMAGE:latest
Registry: Docker Hub
Service: Docker-in-Docker (dind)
4️⃣ EKS Cluster Setup & Deployment
# Cluster Creation
aws eks create-cluster \
  --name $EKS_CLUSTER_NAME \
  --region $AWS_DEFAULT_REGION \
  --role-arn <EKS_IAM_ROLE_ARN> \
  --resources-vpc-config subnetIds=<SUBNET_IDS>,securityGroupIds=<SECURITY_GROUP_IDS>

# Kubernetes Configuration
aws eks update-kubeconfig --name $EKS_CLUSTER_NAME --region $AWS_DEFAULT_REGION
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
5️⃣ Monitoring Stage
# Helm Setup
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Deployment
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
helm install grafana grafana/grafana --namespace monitoring

# Access Grafana
kubectl port-forward svc/grafana 3000:80 -n monitoring
⚙️ Configuration
Prerequisites
Requirement	Purpose
GitLab Account	CI/CD Pipeline
Docker Hub Account	Container Registry
AWS Account	EKS Cluster
GitLab Runner	Pipeline Execution
Helm	Package Management
Environment Variables
Variable	Description	Required
DOCKER_USERNAME	Docker Hub username	✅
DOCKER_PASSWORD	Docker Hub password/token	✅
AWS_ACCESS_KEY_ID	AWS IAM access key	✅
AWS_SECRET_ACCESS_KEY	AWS IAM secret key	✅
AWS_DEFAULT_REGION	AWS region for EKS	✅
EKS_CLUSTER_NAME	EKS cluster name	✅
KUBE_CONFIG_PATH	Optional path for kubeconfig file	❌
📁 Repository Structure
File/Directory	Description
.gitlab-ci.yml	GitLab CI/CD pipeline configuration
Dockerfile	Multi-stage Docker build definition
k8s/deployment.yaml	Kubernetes deployment manifest
k8s/service.yaml	Kubernetes service manifest
prometheus/values.yaml	Helm values/config for Prometheus
grafana/dashboard.yaml	Custom Grafana dashboards
docs/architecture.png	Architectural diagram of the pipeline
🛠️ Technology Stack
CI/CD & Orchestration
GitLab CI/CD - Pipeline automation
Docker - Containerization
Amazon EKS - Kubernetes orchestration
Helm - Kubernetes package management
Monitoring & Observability
Prometheus - Metrics collection and storage
Grafana - Visualization and dashboards
Development
Maven - Build automation
Java - Application runtime
Kubernetes - Container orchestration
📊 Monitoring Features
Prometheus Metrics
Kubernetes cluster metrics
Application performance metrics
Resource utilization
Custom business metrics
Grafana Dashboards
Cluster health monitoring
Application performance
Resource usage trends
Alerting and notifications
⚠️ Important Notes
Cluster Considerations
EKS cluster creation takes 10-15 minutes
Ensure sufficient AWS service quotas
Configure proper IAM roles and policies
Security Best Practices
Use IAM roles instead of access keys where possible
Secure Docker Hub with access tokens
Implement network policies in EKS
Monitor resource usage for cost optimization
Performance Tips
Use appropriate instance types for EKS nodes
Configure resource requests/limits in Kubernetes
Monitor Prometheus storage requirements
Implement log rotation and retention policies
🚀 Quick Start
Set up GitLab CI/CD variables
Configure AWS credentials
Run pipeline - automatic EKS creation
Deploy monitoring stack
Access Grafana at http://localhost:3000
👨‍💻 Author
Aquila Kuunyangna
DevOps Engineer | 3x AWS Certified | Cloud and Automation Enthusiast
