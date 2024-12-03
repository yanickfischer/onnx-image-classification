# docker build -t mosazhaw/efficientnet-lite4-onnx .
# docker run --name efficientnet-lite4-onnx -p 9000:5000 -d mosazhaw/efficientnet-lite4-onnx

FROM python:3.13.0

# Copy Files
WORKDIR /usr/src/app
COPY . .

# Install
RUN apt-get update && apt-get install -y libgl1
RUN pip install -r requirements.txt

# Docker Run Command
EXPOSE 5000
CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0"]