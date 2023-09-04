package com.example.app_client;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

import android.graphics.Color;
import android.graphics.Path;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentChange;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.Query;
import com.google.firebase.firestore.QuerySnapshot;
import com.google.firebase.firestore.core.OrderBy;

import java.util.Map;


public class MainActivity extends AppCompatActivity {

    private static final String wTAG = "wTAG";
    private static final String dTAG = "dTAG";
    private static final String rTAG = "rTAG";

    ImageButton btn1;
    ImageButton btn2;
    TextView txt;
    ConstraintLayout background;

    boolean first_get_warning = true;
    boolean first_get_finished = true;
    String status = "Normal";
    Map<String, Object> m;

    FirebaseFirestore db;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btn1 = findViewById(R.id.btn1);
        btn2 = findViewById(R.id.btn2);
        txt = findViewById(R.id.txt);
        background = findViewById(R.id.background);

        db  = FirebaseFirestore.getInstance();

        listenToWarning();
        listenToFinish();

        getNormal();

    }


    private void getWarning(){
        btn1.setVisibility(View.VISIBLE);
        btn2.setVisibility(View.VISIBLE);
        status = "Warning";
        txt.setTextColor(Color.BLACK);
        txt.setText("跌倒");
        background.setBackgroundColor(Color.YELLOW);
    }

    private void getDanger(){
        btn1.setVisibility(View.INVISIBLE);
        btn2.setVisibility(View.INVISIBLE);
        status = "Danger";
        background.setBackgroundColor(Color.RED);
        txt.setTextColor(Color.WHITE);
        txt.setText("救援");
    }

    private void getNormal(){
        btn1.setVisibility(View.INVISIBLE);
        btn2.setVisibility(View.INVISIBLE);
        status = "Normal";
        txt.setTextColor(Color.WHITE);
        txt.setText("健康");
        background.setBackgroundColor(Color.GREEN);
    }

    public void btn1OnPress(View v) {
        sendDanger();
        getDanger();
    }

    public void btn2OnPress(View v) {
        sendCancel();
        getNormal();
    }

    public void listenToWarning() {
        // [START listen_document]
        CollectionReference ref  = db.collection("Warning");
        ref.orderBy("time", Query.Direction.DESCENDING).limit(1).addSnapshotListener(new EventListener<QuerySnapshot>() {
            @Override
            public void onEvent(@Nullable QuerySnapshot snapshots,
                                @Nullable FirebaseFirestoreException e) {
                if (e != null) {
                    Log.w(wTAG, "Listen failed.", e);
                    return;
                }

                for (DocumentChange dc : snapshots.getDocumentChanges()) {
                    if (dc.getType() == DocumentChange.Type.ADDED) {
                        m = dc.getDocument().getData();
                        Log.d(wTAG, "warning: " + dc.getDocument().getData());
                    }
                }

                if(first_get_warning) {
                    first_get_warning = false;
                    return;
                }
                getWarning();
            }
        });
    }

    public void listenToFinish() {
        // [START listen_document]
        CollectionReference ref  = db.collection("Finish");
        ref.orderBy("time", Query.Direction.DESCENDING).limit(1).addSnapshotListener(new EventListener<QuerySnapshot>() {
            @Override
            public void onEvent(@Nullable QuerySnapshot snapshots,
                                @Nullable FirebaseFirestoreException e) {
                if (e != null) {
                    Log.w(rTAG, "Listen failed.", e);
                    return;
                }

                for (DocumentChange dc : snapshots.getDocumentChanges()) {
                    if (dc.getType() == DocumentChange.Type.ADDED) {
                        m = dc.getDocument().getData();
                        Log.d(rTAG, "Rescued: " + dc.getDocument().getData());
                    }
                }

                if(first_get_finished) {
                    first_get_finished = false;
                    return;
                }

                getNormal();
            }
        });
    }

    private void sendDanger(){
        db.collection("Danger").document(m.get("time").toString())
                .set(m)
                .addOnSuccessListener(new OnSuccessListener<Void>() {
                    @Override
                    public void onSuccess(Void aVoid) {
                        Log.d(dTAG, "DocumentSnapshot successfully written!: " + m);
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.w(dTAG, "Error writing document", e);
                    }
                });
    }

    private void sendCancel(){
        db.collection("Cancel").document(m.get("time").toString())
                .set(m)
                .addOnSuccessListener(new OnSuccessListener<Void>() {
                    @Override
                    public void onSuccess(Void aVoid) {
                        Log.d(dTAG, "DocumentSnapshot successfully written!: " + m);
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.w(dTAG, "Error writing document", e);
                    }
                });
    }
}
