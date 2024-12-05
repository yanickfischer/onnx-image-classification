# docker build -t mosazhaw/onnx-image-classification .
# docker run --name onnx-image-classification -p 9000:5000 -d mosazhaw/onnx-image-classification

FROM python:3.13.0

# Copy Files
WORKDIR /usr/src/app
COPY app.py *.onnx labels_map.txt requirements.txt ./
COPY web web

# Install
RUN apt-get update && apt-get install -y libgl1
RUN pip install -r requirements.txt

# Docker Run Command
EXPOSE 5000
CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0"]